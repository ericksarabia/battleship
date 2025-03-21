import { FC, useState } from 'react';
import type { GameState } from '../lib/types';

interface GameControlsProps {
  gameState: GameState;
  onShot: (input: string) => void;
}

const GameControls: FC<GameControlsProps> = ({ gameState, onShot }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShot(input);
    setInput('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2 justify-center"
    >
      <input
        type="text"
        placeholder="Enter coordinates"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength={3}
        className="w-1/2 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 uppercase"
        disabled={gameState.gameOver}
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
          gameState.gameOver ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={gameState.gameOver}
      >
        FIRE
      </button>
    </form>
  );
};

export default GameControls;
