export interface VoteStats {
  boy: number;
  girl: number;
  total: number;
  boyPct: number;
  girlPct: number;
  exactBoyPct?: string;
  exactGirlPct?: string;
  userChoice?: 'boy' | 'girl' | null;
}

export interface Wish {
  id: string;
  name: string;
  relation: string;
  message: string;
  createdAt: string;
}

export type InvitationStage = 'opening' | 'cradle' | 'card';
