import { VoteStats } from '../types';

/**
 * Mathematically accurate percentage calculation using the Largest Remainder Method (Hamilton-Hare).
 * 
 * Rules:
 * 1. Total Votes = Baby Boy Votes + Baby Girl Votes
 * 2. If Total Votes === 0:
 *    - Boy = 0%, Girl = 0%
 * 3. If Total Votes > 0:
 *    - Exact percentages = (Votes / Total) * 100
 *    - Whole number percentages guaranteed to sum to exactly 100%
 */
export function calculatePercentages(boy: number, girl: number, userChoice: 'boy' | 'girl' | null = null): VoteStats {
  const safeBoy = Math.max(0, Number(boy) || 0);
  const safeGirl = Math.max(0, Number(girl) || 0);
  const total = safeBoy + safeGirl;

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

  const boyFloat = (safeBoy / total) * 100;
  const girlFloat = (safeGirl / total) * 100;

  // Largest Remainder Method (Hamilton-Hare)
  const boyFloor = Math.floor(boyFloat);
  const girlFloor = Math.floor(girlFloat);
  const sumFloor = boyFloor + girlFloor;
  const remainderBoy = boyFloat - boyFloor;
  const remainderGirl = girlFloat - girlFloor;

  let boyPct = boyFloor;
  let girlPct = girlFloor;

  // Distribute remaining points to the option with the higher fractional part
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

  // Double check sum invariant
  if (boyPct + girlPct !== 100) {
    girlPct = 100 - boyPct;
  }

  return {
    boy: safeBoy,
    girl: safeGirl,
    total,
    boyPct,
    girlPct,
    exactBoyPct: boyFloat.toFixed(2),
    exactGirlPct: girlFloat.toFixed(2),
    userChoice,
  };
}
