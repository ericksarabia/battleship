import { FC } from 'react';
import { type GameState, GRID_SIZE } from '../lib/types';

interface GameGridProps {
  gameState: GameState;
}

const GameGrid: FC<GameGridProps> = ({ gameState }) => {
  const renderGrid = () => {
    const rows = [];
    const colHeaders = [];

    // Add column headers (A-J)
    colHeaders.push(
      <div key="empty" className="w-8 h-8 flex items-center justify-center font-bold"></div>
    );

    for (let i = 0; i < GRID_SIZE; i++) {
      colHeaders.push(
        <div
          key={`col-${i}`}
          className="w-8 h-8 flex items-center justify-center mx-1 text-gray-400"
        >
          {String.fromCharCode(65 + i)}
        </div>
      );
    }

    rows.push(
      <div key="col-headers" className="flex">
        {colHeaders}
      </div>
    );

    // Add rows with row headers (1-10)
    for (let i = 0; i < GRID_SIZE; i++) {
      const cells = [];

      cells.push(
        <div
          key={`row-${i}`}
          className="w-8 h-8 flex items-center justify-center my-1 text-gray-400"
        >
          {i + 1}
        </div>
      );

      // Add cells
      for (let j = 0; j < GRID_SIZE; j++) {
        const cellValue = gameState.grid[i][j];
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

        cells.push(
          <div key={`cell-${i}-${j}`} className={cellClass}>
            {cellContent}
          </div>
        );
      }

      rows.push(
        <div key={`row-${i}`} className="flex">
          {cells}
        </div>
      );
    }

    return <div className="grid-container">{rows}</div>;
  };

  return <div className="grid-wrapper overflow-x-auto mb-4">{renderGrid()}</div>;
};

export default GameGrid;
