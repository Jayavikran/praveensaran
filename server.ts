import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Persistent store file for votes and wishes
const DATA_FILE = path.join(__dirname, 'votes_data.json');

interface WishRecord {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: string;
}

interface AppData {
  votes: Record<string, 'boy' | 'girl'>;
  wishes: WishRecord[];
}

// Initial seed data: strictly zero fake votes or dummy wishes
const defaultData: AppData = {
  votes: {},
  wishes: [],
};

function loadData(): AppData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(content);
      // Clean out any legacy sample votes if still lingering
      const cleanVotes: Record<string, 'boy' | 'girl'> = {};
      if (parsed.votes && typeof parsed.votes === 'object') {
        for (const [k, v] of Object.entries(parsed.votes)) {
          if (!k.startsWith('sample-') && (v === 'boy' || v === 'girl')) {
            cleanVotes[k] = v;
          }
        }
      }
      return {
        votes: cleanVotes,
        wishes: Array.isArray(parsed.wishes) ? parsed.wishes : [],
      };
    }
  } catch (err) {
    console.error('Error loading data file, using defaults:', err);
  }
  return defaultData;
}

let isWriting = false;
let pendingSave: AppData | null = null;

function saveData(data: AppData) {
  if (isWriting) {
    pendingSave = data;
    return;
  }
  isWriting = true;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing data file:', err);
  } finally {
    isWriting = false;
    if (pendingSave) {
      const next = pendingSave;
      pendingSave = null;
      saveData(next);
    }
  }
}

let appData = loadData();

/**
 * Largest Remainder Method (Hamilton-Hare)
 * Computes exact mathematical percentages and whole numbers summing to 100% when total > 0.
 * If total is 0, returns 0% for both.
 */
function computeVoteStats(votes: Record<string, 'boy' | 'girl'>, guestId?: string) {
  const voteList = Object.values(votes);
  const boy = voteList.filter((v) => v === 'boy').length;
  const girl = voteList.filter((v) => v === 'girl').length;
  const total = boy + girl;

  const userChoice = guestId && votes[guestId] ? votes[guestId] : null;

  if (total === 0) {
    return {
      boy: 0,
      girl: 0,
      total: 0,
      boyPct: 0,
      girlPct: 0,
      exactBoyPct: '0.00',
      exactGirlPct: '0.00',
      userChoice,
    };
  }

  const boyFloat = (boy / total) * 100;
  const girlFloat = (girl / total) * 100;

  const boyFloor = Math.floor(boyFloat);
  const girlFloor = Math.floor(girlFloat);
  const sumFloor = boyFloor + girlFloor;
  const remainderBoy = boyFloat - boyFloor;
  const remainderGirl = girlFloat - girlFloor;

  let boyPct = boyFloor;
  let girlPct = girlFloor;

  if (sumFloor < 100) {
    const deficit = 100 - sumFloor;
    if (deficit === 1) {
      if (remainderBoy >= remainderGirl) {
        boyPct += 1;
      } else {
        girlPct += 1;
      }
    } else if (deficit >= 2) {
      boyPct += 1;
      girlPct += 1;
    }
  }

  // Exact 100% invariant check
  if (boyPct + girlPct !== 100) {
    girlPct = 100 - boyPct;
  }

  return {
    boy,
    girl,
    total,
    boyPct,
    girlPct,
    exactBoyPct: boyFloat.toFixed(2),
    exactGirlPct: girlFloat.toFixed(2),
    userChoice,
  };
}

// Server-Sent Events (SSE) connections for live updates to all connected visitors
const sseClients = new Set<express.Response>();

function broadcastVoteStats() {
  const globalStats = computeVoteStats(appData.votes);
  const payload = `data: ${JSON.stringify(globalStats)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(payload);
    } catch {
      sseClients.delete(client);
    }
  }
}

// SSE stream for real-time live voting
app.get('/api/votes/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const guestId = typeof req.query.guestId === 'string' ? req.query.guestId : undefined;
  const stats = computeVoteStats(appData.votes, guestId);
  res.write(`data: ${JSON.stringify(stats)}\n\n`);

  sseClients.add(res);

  req.on('close', () => {
    sseClients.delete(res);
  });
});

// GET /api/votes
app.get('/api/votes', (req, res) => {
  const guestId = typeof req.query.guestId === 'string' ? req.query.guestId : undefined;
  const stats = computeVoteStats(appData.votes, guestId);
  res.json(stats);
});

// POST /api/votes - Cast or Change vote
app.post('/api/votes', (req, res) => {
  const { guestId, choice } = req.body;
  if (!guestId || typeof guestId !== 'string' || (choice !== 'boy' && choice !== 'girl')) {
    return res.status(400).json({ error: 'Valid guestId and choice ("boy" | "girl") are required' });
  }

  // Atomically set or replace previous vote (1 active vote per guestId guaranteed)
  const previousVote = appData.votes[guestId] || null;
  appData.votes[guestId] = choice;
  saveData(appData);

  // Broadcast to all connected clients
  broadcastVoteStats();

  const stats = computeVoteStats(appData.votes, guestId);
  res.json({
    success: true,
    previousVote,
    ...stats,
  });
});

// POST /api/votes/remove - Allow guest to retract vote
app.post('/api/votes/remove', (req, res) => {
  const { guestId } = req.body;
  if (!guestId || typeof guestId !== 'string') {
    return res.status(400).json({ error: 'Valid guestId is required' });
  }

  if (appData.votes[guestId]) {
    delete appData.votes[guestId];
    saveData(appData);
    broadcastVoteStats();
  }

  const stats = computeVoteStats(appData.votes, guestId);
  res.json({
    success: true,
    ...stats,
  });
});

// Wishes API
app.get('/api/wishes', (req, res) => {
  res.json(appData.wishes);
});

app.post('/api/wishes', (req, res) => {
  const { name, relation, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }

  const newWish: WishRecord = {
    id: 'wish-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    name: name.trim().slice(0, 50),
    relation: (relation || 'Well-wisher').trim().slice(0, 40),
    message: message.trim().slice(0, 300),
    createdAt: new Date().toISOString(),
  };

  appData.wishes.unshift(newWish);
  if (appData.wishes.length > 100) {
    appData.wishes = appData.wishes.slice(0, 100);
  }
  saveData(appData);

  res.json({ success: true, wish: newWish });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
