import { useState, useEffect } from "react";
import GameGrid from "./game-grid";
import GameControls from "./game-controls";
import GameStatus from "./game-status";
import { type GameState, BATTLESHIP, DESTROYER } from "../lib/types";
import {
  initializeGame,
  processShot,
  validateInput,
  parseInput,
} from "../lib/game-utils";

const Battleship = () => {
  const [gameState, setGameState] = useState<GameState>({
    ships: [],
    grid: Array(10)
      .fill(null)
      .map(() => Array(10).fill(null)),
    shotsFired: 0,
    gameOver: false,
    message: "Enter coordinates to fire a shot!",
  });

  // Initialize game on component mount
  useEffect(() => {
    startNewGame();
  }, []);

  // Start a new game
  const startNewGame = () => {
    const shipTypes = [BATTLESHIP, DESTROYER];
    setGameState(initializeGame(shipTypes));
  };

  // Handle player's shot
  const handleShot = (input: string) => {
    if (gameState.gameOver) {
      return;
    }

    // Validate input format
    if (!validateInput(input)) {
      setGameState({
        ...gameState,
        message: "Invalid input!",
      });
      return;
    }

    // Parse input to get row and column
    const [row, col] = parseInput(input);

    // Check if this position was already targeted
    if (gameState.grid[row][col] !== null) {
      setGameState({
        ...gameState,
        message: "You already fired at this position!",
      });
      return;
    }

    // Process the shot and update game state
    setGameState(processShot(gameState, row, col));
  };

  return (
    <>
      <div className="w-full bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center">
            <GameGrid gameState={gameState} />
            <GameControls gameState={gameState} onShot={handleShot} />
          </div>
        </div>
      </div>
      <GameStatus gameState={gameState} />
    </>
  );
};

export default Battleship;
