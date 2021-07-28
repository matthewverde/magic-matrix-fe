import React from 'react'
import { debounce } from 'lodash';
import { Board } from './Board';
import { colorMap } from './colorMap';
import { CellSizeContext } from './CellSizeContext';

const menuBoard = {
    numRows: 15,
    numCols: 21,
    data:[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]
}

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * 9999999999) % max;
}

const DEFAULT_CELL_WIDTH = 70;
const SMALLEST_CELL_WIDTH = 70;

export class MenuBackgroundBoard extends React.Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.state = {
            board: menuBoard,
            cellWidth: DEFAULT_CELL_WIDTH
        }
        this.debouncedWindowResize = debounce(this.onWindowResize, 100);
    }

    componentDidMount = () => {
        this.interval = setInterval(this.randomizedBoard, 2000);
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.debouncedWindowResize);
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
        window.removeEventListener('resize', this.debouncedWindowResize);
    }

    onWindowResize = () => {
        const newSize = window.innerWidth / this.state.board.numCols;
        this.setState({cellWidth: newSize < SMALLEST_CELL_WIDTH ? SMALLEST_CELL_WIDTH : newSize})
    }

    randomizedBoard = () => {
        let tempBoard = this.state.board;
        const amountToRandomize = getRandomNumber((tempBoard.numRows * tempBoard.numCols) / 2);
        const randomColorKeys = Object.keys(colorMap);
        for(let i = 0; i < amountToRandomize; i++) {
            let randomRow = getRandomNumber(tempBoard.numRows);
            let randomCol = getRandomNumber(tempBoard.numCols);
            tempBoard.data[randomRow][randomCol] = getRandomNumber(randomColorKeys.length);
        }
        this.setState({board: {...tempBoard}});
    }

    render() {

        return (
            <CellSizeContext.Provider value={this.state.cellWidth}>
                <Board board={this.state.board} disableClicks />
            </CellSizeContext.Provider>
        );
    }
    
}