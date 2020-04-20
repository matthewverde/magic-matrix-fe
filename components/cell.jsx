import React, {useContext, useCallback} from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';

import { SelectedColorContext } from './SelectedColorContext';
import { CellSizeContext } from './CellSizeContext';
import { colorMap } from './colorMap';

import config from '../config';

const handleBackground = (backgroundValue) => {
    if(isNaN(backgroundValue)) {
        return css`
            background: url("${String(backgroundValue)}") no-repeat scroll 50% 0;
        `;
    }
    if(colorMap[backgroundValue] !== 'undefined') {
        return css`
            background-color: ${colorMap[backgroundValue]};
        `;
    }

    return css`
        background-color: white;
    `;
}

const StyledCell = styled.div`
    position: relative;
    height: ${({size = 25}) => size}px;
    width: ${({size = 25}) => size}px;
    border: 1px solid black;
    background-size: ${({size = 25}) => size}px;
    ${({backgroundValue}) => {return handleBackground(backgroundValue)}}
    ${({withTransition = true}) => withTransition && css`
        transition: background-color .6s ease;
    `}
`;

export const Cell = ({rowNum, colNum, boardName, value, disableClicks = false}) => {
    const selectedColor = useContext(SelectedColorContext);
    const cellSize = useContext(CellSizeContext);

    const onClick = useCallback(() => {
        if(disableClicks) {
            return;
        }
        axios.post(
            `${config.cellServerUrl}/set-board`,
            {
                row: rowNum,
                col: colNum,
                set: selectedColor,
                boardName
            }
        );
    }, [selectedColor, disableClicks]);

    return(
        <StyledCell 
            onClick={onClick}
            size={cellSize}
            backgroundValue={value}
        />
    )
}