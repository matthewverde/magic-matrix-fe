import React, {useContext, useCallback} from 'react';
import styled, { css } from 'styled-components';

import { SelectedColorContext } from './SelectedColorContext';
import { CellSizeContext } from './CellSizeContext';
import { colorMap } from './colorMap';

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
    if(typeof colorMap[backgroundValue] !== 'undefined') {
        return css`
            background-color: ${colorMap[backgroundValue]};
        `;
    }

    return css`
        background-color: white;
    `;
}

const handleBorder = (borderColor, backgroundValue) => {
    if(!borderColor || borderColor === backgroundValue) {
        return css`
            border: 1px solid black;
        `;
    }

    const valString = String(borderColor);
    if(valString[0] === '#') {
        return css`
            border: 5px solid ${valString};
        `
    }
    if(typeof colorMap[borderColor] !== 'undefined') {
        return css`
            border: 5px solid ${colorMap[borderColor]};
        `;
    }

    return css`
        border: 1px solid black;
    `;
}

const StyledCell = styled.div`
    position: relative;
    height: ${({size = 25}) => size}px;
    width: ${({size = 25}) => size}px;
    ${({borderColor = null, backgroundValue = null}) => { return handleBorder(borderColor, backgroundValue)}}
    background-size: ${({size = 25}) => size}px;
    ${({backgroundValue}) => {return handleBackground(backgroundValue)}}
    ${({withTransition = true}) => withTransition && css`
        transition: background-color .6s ease;
    `}
    :hover {
        cursor: ${({disableClicks}) => disableClicks ? 'default' : 'pointer'};
    }
`;

export const Cell = ({rowNum, colNum, boardName, value, disableClicks = false, onClick, enablePost = true, onMouseEnter, borderColor}) => {
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

    const onCellMouseEnter = useCallback(() => {
        if(typeof onMouseEnter === 'function') {
            onMouseEnter();
        }
    })

    return(
        <StyledCell 
            onClick={onCellClick}
            size={cellSize}
            backgroundValue={value}
            onMouseEnter={onCellMouseEnter}
            borderColor={borderColor}
            disableClicks={disableClicks}
        >
            {value === -1 ? 'N' : null}
            </StyledCell>
    )
}