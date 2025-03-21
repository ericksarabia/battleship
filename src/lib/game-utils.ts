import { GRID_SIZE, type Ship, type GameState } from "../lib/types";

// Initialize the game with randomly placed ships
export function initializeGame(
  shipTypes: { size: number; count: number; name: string }[]
): GameState {
  const grid = Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(null));
  const ships: Ship[] = [];

  // Place all ships
  shipTypes.forEach((shipType) => {
    for (let i = 0; i < shipType.count; i++) {
      placeShip(ships, shipType.size, shipType.name);
    }
  });

  return {
    ships,
    grid,
    shotsFired: 0,
    gameOver: false,
    message: "Enter coordinates to fire a shot!",
  };
}

// Place a ship randomly on the grid
export function placeShip(ships: Ship[], size: number, type: string): void {
  let placed = false;

  while (!placed) {
    // Randomly choose direction (horizontal or vertical)
    const direction = Math.floor(Math.random() * 2);

    // Calculate max starting position based on direction and ship size
    const maxRow = direction === 0 ? GRID_SIZE : GRID_SIZE - size;
    const maxCol = direction === 0 ? GRID_SIZE - size : GRID_SIZE;

    // Generate random starting position
    const startRow = Math.floor(Math.random() * maxRow);
    const startCol = Math.floor(Math.random() * maxCol);

    // Check if ship can be placed without overlapping
    let canPlace = true;
    const positions: number[][] = [];

    for (let i = 0; i < size; i++) {
      const row = direction === 0 ? startRow : startRow + i;
      const col = direction === 0 ? startCol + i : startCol;

      // Check if position is already occupied by another ship
      for (const ship of ships) {
        if (ship.positions.some((pos) => pos[0] === row && pos[1] === col)) {
          canPlace = false;
          break;
        }
      }

      if (!canPlace) break;
      positions.push([row, col]);
    }

    if (canPlace) {
      ships.push({
        type,
        size,
        positions,
        hits: 0,
      });
      placed = true;
    }
  }
}

// Process a shot at the given coordinates
export function processShot(
  gameState: GameState,
  row: number,
  col: number
): GameState {
  // Create a copy of the current game state
  const newGrid = [...gameState.grid.map((gridRow) => [...gridRow])];
  const newShips = [...gameState.ships];
  let newMessage = "";
  let isHit = false;
  let isSunk = false;
  let shipType = "";

  // Check if the shot hits any ship
  for (let i = 0; i < newShips.length; i++) {
    const ship = newShips[i];
    const hitIndex = ship.positions.findIndex(
      (pos) => pos[0] === row && pos[1] === col
    );

    if (hitIndex !== -1) {
      isHit = true;
      ship.hits++;

      if (ship.hits === ship.size) {
        isSunk = true;
        shipType = ship.type;
      }

      break;
    }
  }

  // Update grid based on shot result
  newGrid[row][col] = isHit ? "hit" : "miss";

  // Update message based on shot result
  if (isSunk) {
    newMessage = `You sunk a ${shipType}!`;
  } else if (isHit) {
    newMessage = "Hit!";
  } else {
    newMessage = "Miss!";
  }

  // Check if all ships are sunk
  const allSunk = newShips.every((ship) => ship.hits === ship.size);

  if (allSunk) {
    newMessage = `Game Over! You sunk all ships in ${
      gameState.shotsFired + 1
    } shots!`;
  }

  // Return updated game state
  return {
    ships: newShips,
    grid: newGrid,
    shotsFired: gameState.shotsFired + 1,
    gameOver: allSunk,
    message: newMessage,
  };
}

// Validate input format (e.g., A5)
export function validateInput(input: string): boolean {
  const inputRegex = /^[A-Ja-j]([1-9]|10)$/;
  return inputRegex.test(input);
}

// Parse input to get row and column indices
export function parseInput(input: string): [number, number] {
  const col = input.toUpperCase().charCodeAt(0) - 65; // Convert A-J to 0-9
  const row = Number.parseInt(input.substring(1)) - 1; // Convert 1-10 to 0-9
  return [row, col];
}
