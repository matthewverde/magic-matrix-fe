import React, {useContext, useCallback} from 'react';
import styled, { css } from 'styled-components';

import { SelectedColorContext } from './SelectedColorContext';
import { CellSizeContext } from './CellSizeContext';
import { colorMap } from './colorMap';

import config from '../config';

const handleBackground = (backgroundValue) => {
    const valString = String(backgroundValue);
    if(valString[0] === '#') {
        return css`
            background-color: ${valString};
        `
    }
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
    :hover {
        cursor: pointer;
    }
`;

export const Cell = ({rowNum, colNum, boardName, value, disableClicks = false, onClick, enablePost = true}) => {
    const selectedColor = useContext(SelectedColorContext);
    const cellSize = useContext(CellSizeContext);

    const onCellClick = useCallback(() => {
        if(disableClicks) {
            return;
        }
        const clickObj = {
            row: rowNum,
            col: colNum,
            set: selectedColor,
            boardName
        }

        if(typeof onClick === 'function') {
            onClick(clickObj);
        }
        
    }, [selectedColor, disableClicks, enablePost, onClick]);

    return(
        <StyledCell 
            onClick={onCellClick}
            size={cellSize}
            backgroundValue={value}
        >
            {value === -1 ? 'N' : null}
            </StyledCell>
    )
}