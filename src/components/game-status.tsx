import { FC } from 'react';
import type { GameState } from '../lib/types';

interface GameStatusProps {
  gameState: GameState;
}

const GameStatus: FC<GameStatusProps> = ({ gameState }) => {
  return (
    <div className="mt-6 p-4 border rounded-md bg-green-50 text-green-800 flex items-start w-full min-w-[500px]">
      <div>
        <p className="font-semibold">
          Game Status: <span className="font-normal">{gameState.message}</span>
        </p>
        <p className="font-semibold">
          Shots Fired: <span className="font-normal">{gameState.shotsFired}</span>
        </p>
        <p className="font-semibold">
          Ships Remaining:{' '}
          <span className="font-normal">
            {gameState.ships.filter((ship) => ship.hits < ship.size).length} /{' '}
            {gameState.ships.length}
          </span>
        </p>
      </div>
    </div>
  );
};

export default GameStatus;
