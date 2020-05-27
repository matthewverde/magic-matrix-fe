import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';

import { Board } from './Board';
import { CellSizeContext } from './CellSizeContext';
import { Button } from './Button';

const Flex = styled.div`
    display: flex;
`

const defaultShapeBoard = {
    boardName: 'shapeBoard',
    data: [
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1, 1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1]
    ],
    rows: 7,
    cols: 7,
}

const RESET_NUM = -1;
const RIGHT = 'right';
const LEFT = 'left';

const getOrigin = (board) => {
    const row = Math.floor(board.rows / 2);
    const col = Math.floor(board.cols / 2);

    return {
        row, col
    }
}

const getOffset = (curRow, curCol, origin) => {
    const row = curRow - origin.row;
    const col = curCol - origin.col;

    return {
        row, col
    }
}

const rotateBoard = (board, direction) => {
    // create new object
    const newBoard = JSON.parse(JSON.stringify(board));

    const origin = getOrigin(board);

    for(let curRow = 0; curRow < newBoard.rows; curRow++) {
        for(let curCol = 0; curCol < newBoard.cols; curCol++) {
            const curOffset = getOffset(curRow, curCol, origin);
            let nextRow;
            let nextCol;
            if(direction === RIGHT) {
                nextRow = origin.row + curOffset.col;
                nextCol = origin.col + (curOffset.row * -1);
            } else {
                nextRow = origin.row + (curOffset.col * -1);
                nextCol = origin.col + curOffset.row;
            }
            newBoard.data[nextRow][nextCol] = board.data[curRow][curCol];
        }
    }

    return newBoard;
}

export const ShapeFormer = ({onUpdate}) => {
    const [board, setBoard] = useState(defaultShapeBoard);
    const onCellClick = (obj) => {
        const {row, col, set} = obj;
        const newBoard = {
            ...board,
            data: {
                ...board.data
            }
        }
        newBoard.data[row][col] = set;
        setBoard(newBoard);
    }

    useEffect(() => {
        if(typeof onUpdate === 'function') {
            onUpdate(board);
        }
    }, [board])

    const resetBoard = useCallback(() => {
        const newBoard = {
            ...defaultShapeBoard,
            data: {
                ...defaultShapeBoard.data
            }
        }
        for(let i = 0; i < newBoard.rows; i++) {
            for(let j = 0; j < newBoard.cols; j++) {
                newBoard.data[i][j] = RESET_NUM;
            }
        }
        setBoard(newBoard);
    }, []);

    const rotateRight = useCallback(() => {
        setBoard(rotateBoard(board, RIGHT));
    },[board]);

    const rotateLeft = useCallback(() => {
        setBoard(rotateBoard(board, LEFT));
    },[board]);

    return (
        <CellSizeContext.Provider value={29.2}>
            <Board board={board} onClick={onCellClick} enablePost={false} />
            <Flex>
                <Button onClick={rotateLeft}>Rotate left</Button>
                <Button onClick={rotateRight}>Rotate right</Button>
            </Flex>
            <Button onClick={resetBoard}>Reset Shaper</Button>
        </CellSizeContext.Provider>
    )
}