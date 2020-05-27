import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Cell } from './cell';

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const getCoveredBoardColor = ({row, col, hoveredBoard, hoveredBoardOrigin}) => {
  if(!hoveredBoard || !hoveredBoardOrigin) {
    return -1;
  }
  const diffRow = hoveredBoardOrigin?.row - row;
  const diffCol  = hoveredBoardOrigin?.col - col;
  // This assumes rows === cols, and there is an odd number of rows
  const maxDistanceFromOrigin = (Math.floor(hoveredBoard.rows / 2));

  if(Math.abs(diffRow) <= maxDistanceFromOrigin && Math.abs(diffCol) <= maxDistanceFromOrigin) {
    return hoveredBoard.data[maxDistanceFromOrigin - diffRow][maxDistanceFromOrigin - diffCol];
  }

  return -1;
}

export function Board({board, onClick, disableClicks = false, enablePost, onCellMouseEnter, hoveredBoard, hoveredBoardOrigin, onMouseLeave}) {
    if(!board || !board.data) {
      return (
        <div>
            Huh, nothing here for the moment
        </div>
      );
    }

  const onCellMouseOver = useCallback((rowNum, colNum) => {
    if(typeof onCellMouseEnter === 'function') {
      onCellMouseEnter(rowNum, colNum);
    }
  },[onCellMouseEnter])

  const onBoardMouseLeave = useCallback(() => {
    if(typeof onMouseLeave === 'function') {
      onMouseLeave();
    }
  },[onMouseLeave])

    let allRows = Object.values(board.data).map((row, rowNum) => {
      return(
        <Row key={`row_${rowNum}`}>
          {Object.values(row).map((cellValue, colNum) => {
            return(
              <Cell
                rowNum={rowNum}
                colNum={colNum}
                value={cellValue}
                boardName={board.name}
                key={`cell_${rowNum}_${colNum}`}
                disableClicks={disableClicks}
                onClick={onClick}
                enablePost={enablePost}
                onMouseEnter={() => {onCellMouseOver(rowNum, colNum)}}
                borderColor={getCoveredBoardColor({row: rowNum, col: colNum, hoveredBoard, hoveredBoardOrigin})}
              />
            )
          })}
        </Row>
      )
    })
  
    return(
      <div onMouseLeave={onBoardMouseLeave}>
        {allRows}
      </div>
    );
  }