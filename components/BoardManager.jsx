import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { Board } from './Board';
import { Button } from './Button';
import { ColorSelector } from './ColorSelector';
import { SelectedColorContext } from './SelectedColorContext';
import { SizeSelector } from './SizeSelector';
import { CellSizeContext } from './CellSizeContext';

import config from '../config'

const StyledSelectorContainer = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    height: 20vh;
    width: 100%;
    z-index: 100;
`;

const StyledSliderContainer = styled.div`
    position: fixed;
    right: 40px;
    top: 0;
    z-index: 100;
    height: 15vh;
    width: 40px;
`;

const StyledBoardWrapper = styled.div`
    height: 80vh;
    padding-right: 16px;
    padding-left: 16px;
    overflow: scroll;
    display: flex;
    justify-content: center;
`;

export const BoardManager = ({initialBoardName = null, withSelector = true}) => {
    const [boardName, setBoardName] = useState(initialBoardName);
    const [board, setBoard] = useState(null);
    const [selectedColor, setSelectedColor] = useState(1);
    const [cellSize, setCellSize] = useState(25);

    useEffect(() => {
        if(!boardName) {
            return;
        }
        const evtSource = new EventSource(`${config.cellServerUrl}/boards/${boardName}`);
        evtSource.onmessage = (e) => {
        setBoard(JSON.parse(e.data));
        }
     }, [boardName]);

  return (
    <div>
        <SelectedColorContext.Provider value={selectedColor}>
            <CellSizeContext.Provider value={cellSize}>
                {board && (
                    <StyledBoardWrapper>
                        <Board board={board} />
                    </StyledBoardWrapper>
                    )}
                {board && withSelector && (
                    <StyledSelectorContainer>
                        <ColorSelector onChange={color => {setSelectedColor(color)}}/>
                    </StyledSelectorContainer>
                )}
                {board && withSelector && (
                    <StyledSliderContainer>
                        <SizeSelector onChange={size => {setCellSize(size)}}/>
                    </StyledSliderContainer>
                )}
            </CellSizeContext.Provider>
        </SelectedColorContext.Provider>
    </div>
  );
}