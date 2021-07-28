import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import config from '../config';
import { Button } from './Button';

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BoardHeader = styled.h3`
    text-align: center;
`

export const BoardJoiner = ({startBoard, startMake}) => {
    const [boardList, setBoardList] = useState(null);
    useEffect(() => {
        const asyncCall = async () => {
            const res = await axios.get(`${config.cellServerUrl}/boards`);
            setBoardList(res.data || [])
        }
        asyncCall();
    },[]);

    if(boardList === null) {
        return (
            <ButtonContainer>
                <div>loading boards</div>
            </ButtonContainer>
        );
    }

    const hasList =  boardList && boardList.length;

    return(
        <div>
            {boardList && (
                <>
                <BoardHeader>Boards</BoardHeader>
                <ButtonContainer>
                    {boardList.map(name => {
                        return (
                            <Button width={"400px"} href={`/boards/${name}`}>
                                {name}
                            </Button>
                        )
                    })}
                </ButtonContainer>
                </>
            )}
            {
                !hasList && (
                    <div>
                        <span>Hmm no boards to choose from, why don't you</span>
                        <Button onClick={startMake}>
                            Make a Board
                        </Button>
                    </div>
                )
            }
        </div>
    );
}