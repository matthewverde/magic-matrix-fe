import React, {useState, useEffect, useCallback, useRef} from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import axios from 'axios';

import { Board } from './Board';
import { ColorSelector } from './ColorSelector';
import { SelectedColorContext } from './SelectedColorContext';
import { SizeSelector } from './SizeSelector';
import { CellSizeContext } from './CellSizeContext';
import { ShapeFormer } from './ShapeFormer';

import config from '../config'

const StyledSelectorContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    cursor: grab;
    background-color: white;
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
    width: 100vw;
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
    const [ clickShape, setClickShape ] = useState(null)
    const [cellSize, setCellSize] = useState(25);
    const evtSourceRef = useRef(null);
    const selectorRef = useRef(null);

    const handleDrag = useCallback((e) => {
        if(!selectorRef.current) {
            console.warn('no selector ref')
            return;
        }
        selectorRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    })

    const editBoard = useCallback((data) => {
        if(typeof data === 'undefined') {
            return;
        }

        const {type = 'board'} = data;
        if(type === 'board') {
            setBoard(data);
        } else if (type === 'update') {
            if(board === null) {
                console.log('board null');
                return;
            }

            const newBoard = {
                ...board,
                data: {
                    ...board.data,
                }
            };
            const {row, col, set} = data;
            newBoard.data[row][col] = set;
            setBoard(newBoard);
        } else if(type === 'update-bulk') {
            if(board === null) {
                console.log('board null');
                return;
            }

            const newBoard = {
                ...board,
                data: {
                    ...board.data,
                }
            };
            const {rows, cols, sets} = data;
            for(let i = 0; i < rows.length; i++) {
                newBoard.data[rows[i]][cols[i]] = sets[i];
            }
            setBoard(newBoard);
        }
    },[board]);

    useEffect(() => {
        if(typeof boardName === 'string' && boardName.length > 0) {
            if(evtSourceRef.current !== null) {
                evtSourceRef.current.close();
            }
            evtSourceRef.current = new EventSource(`${config.cellServerUrl}/boards/${boardName}`);
        }
    }, [boardName])

    useEffect(() => {
        if(evtSourceRef.current !== null) {
            evtSourceRef.current.onmessage = (e) => {
                try {
                    editBoard(JSON.parse(e.data));
                } catch (e) {
                    console.error('caught on eventSource', e);
                }
            }
        }
     }, [editBoard, evtSourceRef.current]);

     const onCellClick = useCallback(cellObj => {
         const {row, col} = cellObj;
         const rowsOffset = Math.floor(clickShape.rows / 2);
         const colsOffset = Math.floor(clickShape.cols / 2);
         const rowsToSend = [], colsToSend = [], setsToSend = [];
         let shapeRow = 0;
         for(let curRow = row - rowsOffset; curRow <= row + rowsOffset; curRow++) {
             let shapeCol = 0;
            for(let curCol = col - colsOffset; curCol <= col + colsOffset; curCol++) {
                if(curRow >= 0 && curCol >= 0) {
                    if(curRow < board.cols && curCol < board.rows && clickShape.data[shapeRow][shapeCol] !== -1) {
                        rowsToSend.push(curRow);
                        colsToSend.push(curCol);
                        setsToSend.push(clickShape.data[shapeRow][shapeCol])
                    }
                }
                shapeCol++;
            }
            shapeRow++;
         }
         if(rowsToSend.length) {
            axios.post(
                `${config.cellServerUrl}/set-board-bulk`,
                {
                    rows: rowsToSend,
                    cols: colsToSend,
                    sets: setsToSend,
                    boardName
                }
            );
         }
        
     },[clickShape, board, boardName]);

     const onShapeUpdate = useCallback(shapeBoard => {
         setClickShape({...shapeBoard});
         console.log('shapeBoard', shapeBoard);
     },[])

  return (
    <div>
        <SelectedColorContext.Provider value={selectedColor}>
            <CellSizeContext.Provider value={cellSize}>
                {board && (
                    <StyledBoardWrapper>
                        <Board board={board} onClick={onCellClick} />
                    </StyledBoardWrapper>
                    )}
                {board && withSelector && (
                    <StyledSelectorContainer ref={selectorRef} draggable onDragEnd={handleDrag}>
                        <ColorSelector onChange={color => {setSelectedColor(color)}}/>
                        <ShapeFormer onUpdate={onShapeUpdate} />
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