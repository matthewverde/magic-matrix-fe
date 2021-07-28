import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Router from 'next/router';

import { TextInput } from './TextInput';
import { Button } from './Button';
import { Text } from './Text';

import config from '../config';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-around;
    flex-grow: 4;
`;

const RowsWrapper = styled(Flex)`
    padding-right: 16px;
`

const StyledSizeLabel = styled.div`
    margin-left: 8px;
    font-weight: 500;
`

const StyledSizeSection = styled.div`
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MAX_ROW_SIZE = 99;
const MAX_COL_SIZE = 99;

const defineRows = (requestedRowSize) => {
    const rowSize = Number(requestedRowSize);
    
}

export const BoardMaker = ({startBoard}) => {
    const [ boardName, setBoardName ] = useState('');
    const [ boardRows, setBoardRows ] = useState(20);
    const [ boardCols, setBoardCols ] = useState(20);
    const [ submitted, setSubmitted ] = useState(false);

    const onSubmitClick =  useCallback(() => {
        const asyncMakeCall = async () => {
            const res = await axios.post(
                `${config.cellServerUrl}/make-board`,
                {
                    row: Number(boardRows),
                    col: Number(boardCols),
                    boardName: boardName,
                    set: 0,
                    override: false
                }
            );
            
            if(res.status === 200) {
                setSubmitted(true)
            }
        }
        asyncMakeCall();
        Router.push({
            pathname: `/boards/${boardName}`
        })
        
    }, [boardName, boardRows, boardCols]);

    useEffect(() => {
        if(submitted) {
            startBoard(boardName);
        }
    }, [submitted]);

    return (
        <Wrapper>
            <Text>Name your board</Text>
            <TextInput initialValue="DnD Crawler" onChange={val => {setBoardName(val)}}/>
            <StyledSizeSection>
                <Text>Board Size</Text>
                <Flex>
                    <RowsWrapper>
                        <TextInput width={"30px"} initialValue={boardRows} onChange={val => {setBoardRows(val)}}/>
                        <StyledSizeLabel>rows</StyledSizeLabel>
                    </RowsWrapper>
                    <Flex>
                        <TextInput width={"30px"} initialValue={boardCols} onChange={val => {setBoardCols(val)}}/>
                        <StyledSizeLabel>cols</StyledSizeLabel>
                    </Flex>
                </Flex>
            </StyledSizeSection>
            <Button width={"30%"} onClick={onSubmitClick}>Make Board</Button>
        </Wrapper>
    );
}