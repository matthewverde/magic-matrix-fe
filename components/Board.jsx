import React from 'react';
import styled from 'styled-components';

import { Cell } from './cell';

const Row = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export function Board({board, disableClicks = false}) {
    if(!board || !board.data) {
      return (
        <div>
            Huh, nothing here for the moment
        </div>
      );
    }
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
              />
            )
          })}
        </Row>
      )
    })
  
    return(
      <div>
        {allRows}
      </div>
    );
  }