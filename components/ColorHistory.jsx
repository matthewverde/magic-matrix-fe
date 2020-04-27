import React, { useContext, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { SelectedColorContext } from './SelectedColorContext';
import { colorMap } from './colorMap';

const StyledColorContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
`;

const StyledIcon = styled.div`
    height: 20px;
    width: 20px;
    background-color: ${({color}) => color};
    border: 1px solid black;
    border-radius: 5px;
`;

const RadioWrapper = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: row;
`;

export const ColorHistory = ({onChange}) => {
    const [ history, setHistory ] = useState([]);
    const selectedColor = useContext(SelectedColorContext);

    useEffect(() => {
        if(history.indexOf(selectedColor) === -1) {
            setHistory([...history, selectedColor]);
        }
    }, [selectedColor]);

    const onRadioChange = useCallback((color) => {
        if(typeof onChange === 'function') {
            onChange(color);
        }
    }, [onChange])


    return (
        <StyledColorContainer>
            {
                history.map((color) => (
                    <RadioWrapper key={`color_${color}`}>
                        <input type="radio"
                            checked={color == selectedColor}
                            id={color}
                            name="selectedColor"
                            value={colorMap[color] || color}
                            onChange={() => {onRadioChange(color)}}/>
                        <StyledIcon color={colorMap[color] || color} />
                    </RadioWrapper>
                ))
            }
            </StyledColorContainer>
    )
}