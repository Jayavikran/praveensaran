# Praveen & Saran – Premium Animated Baby Shower Invitation Website 🍼✨

A mobile-first, interactive, and animated digital baby shower invitation website crafted for **Praveen & Saran**. Designed with pastel pink, lavender purple, and elegant gold accents, featuring a magical entrance, rocking cradle animation, Boy/Girl prediction poll, live countdown, calendar integration, and WhatsApp sharing.

---

## 🌟 Features & Highlights

1. **Magical Opening Scene**:
   - Soft pastel pink and lavender gradient backdrop with golden sparkles.
   - Sequential animated baby footprints walking across the screen.
   - Cute sleeping baby on a fluffy cloud with gentle bouncing animation.
   - Blooming floral transition into the celebration.

2. **Dedicated Rocking Cradle Scene**:
   - Sweet illustrated baby resting in a decorated lavender and pink cradle with gold trimmings.
   - Pendulum rocking cradle animation (`animate-cradle`) and soft baby breathing loop.
   - Blooming flower clusters flanking both sides.
   - Touching quote: *"Tiny Hands, Tiny Feet, A Little Miracle We Can't Wait to Meet!"*

3. **Main Invitation Card**:
   - Original photograph of Praveen and Saran prominently framed with golden corners and zero distortion.
   - Fullscreen Zoom Lightbox modal to inspect every detail of the invitation.
   - Event details:
     - **Function**: Baby Shower Function (Seemantham & Valakaappu)
     - **Couple**: Praveen & Saran
     - **Date**: October 25, 2026 (Sunday)
     - **Time**: 10:00 AM IST
     - **Venue**: Sivakasi Mandapam

4. **Cherished Memories Carousel ("Our Journey of Love 📸")**:
   - Interactive carousel with smooth transitions, autoplay toggle, navigation arrows, chapter dots, and full-resolution lightbox zoom.
   - Four nostalgic milestone chapters:
     - *Chapter I: The Sacred Vows* (Wedding celebration and auspicious garlands)
     - *Chapter II: Tiny Booties, Big Dreams* (Sweet pregnancy announcement amidst garden roses)
     - *Chapter III: Golden Sunset Glow* (Maternity garden walk holding hands)
     - *Chapter IV: Baby Shower Festivity* (Praveen & Saran dressed in festive silks)
   - Interactive thumbnail gallery strip for direct jumps between memories.

5. **Accurate Live Baby Boy vs Baby Girl Prediction ("Guess the Little One! 🍼")**:
   - **Strict Mathematical Invariant**: Uses the Largest Remainder Method (Hamilton-Hare) to guarantee whole-number display percentages always sum to exactly 100% when votes exist.
   - **Zero Votes Handling**: Displays 0% for both Baby Boy and Baby Girl when no votes have been cast.
   - **One Active Vote per Guest**: Enforced centrally on the server via anonymous guest identifiers.
   - **Vote Changing**: Guests can switch their vote at any time; the previous vote is atomically replaced so no vote is ever double-counted.
   - **Live Multi-User Synchronization**: Powered by real-time Server-Sent Events (`/api/votes/stream`) with background fallback polling, so results update automatically across all visitor screens.
   - **No Fabricated Numbers**: Zero fake votes; displays genuine database state and graceful error recovery if the server connection drops.

5. **Live Countdown Timer**:
   - Live real-time seconds countdown to October 25, 2026 at 10:00 AM IST (+05:30).
   - Pastel glassmorphic cards with tabular figures.
   - Celebratory message upon reaching the event date.

6. **Calendar Invitation ("Save the Date 📅")**:
   - 1-click download of `.ics` calendar file configured with proper IST timezone, location, and description.
   - Direct web link to add event to Google Calendar.

7. **Share Invitation 💌**:
   - Mobile Web Share API support.
   - Pre-formatted WhatsApp share message with date, time, venue, and live website URL.
   - 1-click clipboard copy with instant visual feedback.

8. **Gentle Background Lullaby**:
   - Built-in music box / celesta chime synthesizer powered by the browser's Web Audio API.
   - 100% royalty-free with zero external audio file latency.
   - Visible sound toggle, respects browser autoplay constraints.

9. **Guest Blessings & Wishes Wall**:
   - Family & friends can submit loving wishes and advice for the new parents.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Full-Stack Server**: Express.js + tsx
- **Animations**: Motion (Framer Motion v12) + CSS3 Keyframes + Canvas Confetti
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Audio**: Web Audio API Sound Synthesizer

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Run Production Server
```bash
npm start
```

---

## 🗳️ Backend & Shared Voting Configuration

This project includes a built-in Express backend (`server.ts`) storing votes and wishes in `votes_data.json` while also providing automatic client `localStorage` caching so the app works seamlessly online and offline.

### Optional: Connecting Supabase or Firebase
If you wish to replace the built-in Express store with Supabase or Firebase:
1. In `src/utils/api.ts`, swap `getVoteStats()` and `submitVote()` to call your Supabase table (`votes`) or Firestore collection (`votes`).
2. Add your environment variables in `.env`:
   ```env
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key"
   ```

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Install the Vercel CLI or connect your Git repository in the Vercel dashboard:
   ```bash
   npm i -g vercel
   vercel
   ```
2. Build Command: `npm run build`
3. Output Directory: `dist`

### Deploy to Netlify
1. Connect your repository in Netlify.
2. Build Command: `npm run build`
3. Publish Directory: `dist`

### Connecting a Custom Domain
1. In your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.), add a CNAME record pointing to your deployment alias (e.g., `cname.vercel-dns.com`).
2. In the hosting platform settings, enter your domain (e.g. `praveenandsaran.com`).
3. SSL certificates will automatically provision within minutes.
