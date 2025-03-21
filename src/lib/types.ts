export const GRID_SIZE = 10;

export type Ship = {
  type: string;
  size: number;
  positions: number[][];
  hits: number;
};

export type GameState = {
  ships: Ship[];
  grid: (null | "hit" | "miss")[][];
  shotsFired: number;
  gameOver: boolean;
  message: string;
};
