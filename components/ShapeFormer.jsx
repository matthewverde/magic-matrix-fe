import React, {useState, useEffect, useCallback} from 'react';

import { Board } from './Board';
import { CellSizeContext } from './CellSizeContext';
import { Button } from './Button';

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
                newBoard.data[i][j] = -1;
            }
        }
        setBoard(newBoard);
    }, []);

    return (
        <CellSizeContext.Provider value={29.2}>
            <Board board={board} onClick={onCellClick} enablePost={false} />
            <Button onClick={resetBoard}>Reset Shaper</Button>
        </CellSizeContext.Provider>
    )
}