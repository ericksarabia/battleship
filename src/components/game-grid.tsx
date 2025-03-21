import { FC } from 'react';
import { type GameState, GRID_SIZE } from '../lib/types';

interface GameGridProps {
  gameState: GameState;
}

const GameGrid: FC<GameGridProps> = ({ gameState }) => {
  // Generate column headers (A-J)
  const columnHeaders = [
    <div key="empty" className="w-8 h-8 flex items-center justify-center font-bold"></div>,
    ...Array.from({ length: GRID_SIZE }, (_, i) => (
      <div
        key={`col-${i}`}
        className="w-8 h-8 flex items-center justify-center font-bold mx-1 text-gray-400"
      >
        {String.fromCharCode(65 + i)}
      </div>
    )),
  ];

  // Generate grid cells with row headers
  const gridRows = Array.from({ length: GRID_SIZE }, (_, rowIndex) => {
    // Row header (1-10)
    const rowHeader = (
      <div
        key={`row-${rowIndex}`}
        className="w-8 h-8 flex items-center justify-center font-bold my-1 text-gray-400"
      >
        {rowIndex + 1}
      </div>
    );

    // Row cells
    const cells = Array.from({ length: GRID_SIZE }, (_, colIndex) => {
      const cellValue = gameState.grid[rowIndex][colIndex];
      let cellContent = null;
      let cellClass =
        'w-8 h-8 border border-gray-300 flex items-center justify-center m-1 rounded-sm';

      if (cellValue === 'hit') {
        cellContent = <span className="text-red-500 font-bold">✓</span>;
        cellClass = `${cellClass} bg-red-100 border-red-500`;
      } else if (cellValue === 'miss') {
        cellContent = <span className="text-green-500 font-bold">✗</span>;
        cellClass = `${cellClass} bg-green-100 border-green-500`;
      }

      return (
        <div key={`cell-${rowIndex}-${colIndex}`} className={cellClass}>
          {cellContent}
        </div>
      );
    });

    return (
      <div key={`row-${rowIndex}`} className="flex">
        {rowHeader}
        {cells}
      </div>
    );
  });

  return (
    <div className="grid-wrapper overflow-x-auto mb-4">
      <div className="grid-container">
        <div className="flex">{columnHeaders}</div>
        {gridRows}
      </div>
    </div>
  );
};

export default GameGrid;
