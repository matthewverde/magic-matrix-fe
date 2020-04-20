import React from 'react'
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

let interval = null;

const getRandomNumber = (max) => {
    return Math.floor(Math.random() * 9999999999) % max;
}

export class MenuBackgroundBoard extends React.Component {
    constructor(props) {
        super(props);
        this.interval = null;
        this.state = {
            board: menuBoard
        }
    }

    componentDidMount = () => {
        this.interval = setInterval(this.randomizedBoard, 2000);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
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
            <CellSizeContext.Provider value={70}>
            <Board board={this.state.board} disableClicks />
            </CellSizeContext.Provider>
        );
    }
    
}