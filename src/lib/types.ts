export const GRID_SIZE = 10;

export type GameState = {
  grid: (null | "hit" | "miss")[][];
  shotsFired: number;
  gameOver: boolean;
  message: string;
};
