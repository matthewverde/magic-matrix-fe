import React from 'react';
import styled from 'styled-components';

import { Menu } from './Menu';
import { BoardManager } from './BoardManager';
import { BoardMaker } from './BoardMaker';
import { BoardJoiner } from './BoardJoiner';
import { MenuBackgroundBoard } from './MenuBackgroundBoard';

const StyledBackgroundBoardWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    position: absolute;
    z-index: -1;
    overflow: hidden;
`

const StyledMenuMask = styled.div`
    position: absolute;
    left: calc(50% - 35vw);
    top: 20%;
    background: white;
    border-radius: 8px;
    width: 70vw;
    height: 50vh;
    opacity: .9;
`

const StyledMaskScreen = styled.div`
    position: relative;
    padding: 32px 16px;
`;

const StyledPill = styled.div`
    position: absolute;
    background-color: black;
    color: white;
    height: 20px;
    border-radius: 100%;
    top: 8px;
    left: 8px;
    width: 80px;
    cursor: pointer;
`


export class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenu: true,
            isJoin: false,
            isMake: false,
            isStart: false,
            initialBoardName: null
        };
    }

    startMenu = () => {
        this.setState({
            isMenu: true,
            isJoin: false,
            isMake: false,
            isStart: false,
        });
    }

    startJoin = () => {
        this.setState({
            isMenu: false,
            isJoin: true,
            isMake: false,
            isStart: false,
        });
    }

    startBoard = (boardName) => {
        this.setState({
            isMenu: false,
            isJoin: false,
            isMake: false,
            isStart: true,
            initialBoardName: boardName ? boardName : null
        });
    }

    startMake = () => {
        this.setState({
            isMenu: false,
            isJoin: false,
            isStart: false,
            isMake: true
        });
    }

    render() {
        const {isMenu, isJoin, isMake, isStart, initialBoardName} = this.state;

        return(
            <div>
                {!isStart && (
                <>
                    <StyledBackgroundBoardWrapper>
                        <MenuBackgroundBoard/>
                    </StyledBackgroundBoardWrapper>
                    <StyledMenuMask>
                        <StyledMaskScreen>
                            {!isMenu && <StyledPill onClick={this.startMenu}>Back</StyledPill>}
                            {isMenu && <Menu startJoin={this.startJoin} startMake={this.startMake}/>}
                            {isJoin && <BoardJoiner startBoard={this.startBoard} startMake={this.startMake}/>}
                            {isMake && <BoardMaker startBoard={this.startBoard} />}
                        </StyledMaskScreen>
                    </StyledMenuMask>
                </>
                )}
                
                {isStart && <BoardManager initialBoardName={initialBoardName}/>}
            </div>
        )
    }
}