import React, {useState, useEffect} from 'react';

import { Board } from './Board';
import { CellSizeContext } from './CellSizeContext';

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

    return (
        <CellSizeContext.Provider value={29.2}>
            <Board board={board} onClick={onCellClick} enablePost={false} />
        </CellSizeContext.Provider>
    )
}