
export interface Purifier {
  id: string;
  description: string;
  refillCount: 1 | 2;
  price: number;
}

export interface Refill {
  id: string;
  description: string;
  price: number;
}

export type UserRole = 'client' | 'manager';

export interface AppState {
  purifiers: Purifier[];
  refills: Refill[];
}
