import { VoteStats, Wish } from '../types';
import { calculatePercentages } from './calc';

const GUEST_ID_KEY = 'ps_babyshower_guest_id';
const LOCAL_VOTE_KEY = 'ps_babyshower_user_vote';
const LOCAL_WISHES_KEY = 'ps_babyshower_wishes';

/**
 * Retrieves or initializes an anonymous persistent guest identifier.
 * Used by the server to enforce exactly 1 active vote per guest and allow changing votes.
 */
export function getGuestId(): string {
  let id = localStorage.getItem(GUEST_ID_KEY);
  if (!id) {
    id = 'guest_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    localStorage.setItem(GUEST_ID_KEY, id);
  }
  return id;
}

export function getStoredUserVote(): 'boy' | 'girl' | null {
  const vote = localStorage.getItem(LOCAL_VOTE_KEY);
  if (vote === 'boy' || vote === 'girl') {
    return vote;
  }
  return null;
}

export function setStoredUserVote(vote: 'boy' | 'girl' | null) {
  if (vote) {
    localStorage.setItem(LOCAL_VOTE_KEY, vote);
  } else {
    localStorage.removeItem(LOCAL_VOTE_KEY);
  }
}

/**
 * Fetches authoritative live vote statistics from central server.
 * Never fabricates or returns fake votes.
 */
export async function getVoteStats(): Promise<VoteStats> {
  const guestId = getGuestId();
  const res = await fetch(`/api/votes?guestId=${encodeURIComponent(guestId)}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch vote data: ${res.statusText}`);
  }
  const data = await res.json();
  const stats = calculatePercentages(data.boy, data.girl, data.userChoice || null);
  if (stats.userChoice) {
    setStoredUserVote(stats.userChoice);
  }
  return stats;
}

/**
 * Submits or changes a vote.
 * Server replaces the previous vote for this guestId.
 */
export async function submitVote(choice: 'boy' | 'girl'): Promise<VoteStats> {
  const guestId = getGuestId();
  const res = await fetch('/api/votes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guestId, choice }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Failed to submit vote: ${res.statusText}`);
  }

  const data = await res.json();
  setStoredUserVote(choice);
  return calculatePercentages(data.boy, data.girl, choice);
}

/**
 * Retracts / removes a guest's existing vote completely.
 */
export async function removeVote(): Promise<VoteStats> {
  const guestId = getGuestId();
  const res = await fetch('/api/votes/remove', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guestId }),
  });

  if (!res.ok) {
    throw new Error(`Failed to remove vote: ${res.statusText}`);
  }

  const data = await res.json();
  setStoredUserVote(null);
  return calculatePercentages(data.boy, data.girl, null);
}

/**
 * Subscribes to real-time Server-Sent Events (SSE) so all guests
 * see votes and percentages update live across devices.
 */
export function subscribeToVoteStream(onUpdate: (stats: VoteStats) => void, onError?: () => void): () => void {
  const guestId = getGuestId();
  let es: EventSource | null = null;
  let isClosed = false;

  try {
    es = new EventSource(`/api/votes/stream?guestId=${encodeURIComponent(guestId)}`);

    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const stats = calculatePercentages(data.boy, data.girl, data.userChoice || getStoredUserVote());
        onUpdate(stats);
      } catch (err) {
        console.error('Error parsing SSE vote stream data:', err);
      }
    };

    es.onerror = () => {
      if (!isClosed && onError) {
        onError();
      }
    };
  } catch (err) {
    console.error('EventSource failed to initialize:', err);
    if (onError) onError();
  }

  return () => {
    isClosed = true;
    if (es) {
      es.close();
    }
  };
}

// Wishes API
export async function getWishes(): Promise<Wish[]> {
  try {
    const res = await fetch('/api/wishes');
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem(LOCAL_WISHES_KEY, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('API /api/wishes offline, using local store:', err);
  }

  const cached = localStorage.getItem(LOCAL_WISHES_KEY);
  if (cached) {
    try {
      const parsed: Wish[] = JSON.parse(cached);
      return parsed.filter(
        (w) => !w.id.startsWith('seed-') && !w.id.startsWith('wish-')
      );
    } catch {
      // ignore
    }
  }

  return [];
}

export async function submitWish(name: string, relation: string, message: string): Promise<Wish> {
  try {
    const res = await fetch('/api/wishes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, relation, message }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.wish;
    }
  } catch (err) {
    console.warn('API submitWish offline, falling back locally:', err);
  }

  const newWish: Wish = {
    id: 'local-' + Date.now(),
    name,
    relation: relation || 'Well-wisher',
    message,
    createdAt: new Date().toISOString(),
  };

  const existing = await getWishes();
  const updated = [newWish, ...existing];
  localStorage.setItem(LOCAL_WISHES_KEY, JSON.stringify(updated));
  return newWish;
}
