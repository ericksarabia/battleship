export const BATTLESHIP = { size: 5, count: 1, name: "Battleship" };
export const DESTROYER = { size: 4, count: 2, name: "Destroyer" };
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
