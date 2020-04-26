import React, {useState, useEffect, useCallback, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Router from 'next/router';

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
    top: 0;
    height: 100vh;
    width: 300px;
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
    height: 100vh;
    padding-right: 16px;
    padding-left: 16px;
    overflow: scroll;
    display: flex;
    justify-content: center;
`;

export const BoardManager = ({boardName = null, withSelector = true}) => {
    if(!boardName) {
        console.log('no board name');
        Router.push({
            pathname: '/'
        })
    }
    const [board, setBoard] = useState(null);
    const [selectedColor, setSelectedColor] = useState(1);
    const [cellSize, setCellSize] = useState(25);
    const evtSourceRef = useRef(null);

    const editBoard = useCallback((data) => {
        console.log('top', data);
        if(typeof data === 'undefined') {
            return;
        }

        const {type = 'board'} = data;

        console.log('type', type);
        if(type === 'board') {
            setBoard(data);
        } else if (type === 'update') {
            if(board === null) {
                console.log('board null');
                return;
            }

            console.log('stateBoard', board);
            const newBoard = {
                ...board,
                data: {
                    ...board.data,
                }
            };
            console.log('newBoard', newBoard);
            const {row, col, set} = data;
            newBoard.data[row][col] = set;
            console.log('editBoardSet', row, col, set, newBoard);
            setBoard(newBoard);
        }
    },[board]);

    useEffect(() => {
        if(boardName !== null) {
            if(evtSourceRef.current === null) {
                evtSourceRef.current = new EventSource(`${config.cellServerUrl}/boards/${boardName}`);
            }
            evtSourceRef.current.onmessage = (e) => {
                try {
                    editBoard(JSON.parse(e.data));
                } catch (e) {
                    console.error('caught on eventSource', e);
                }
            }
        }
     }, [boardName, editBoard]);

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