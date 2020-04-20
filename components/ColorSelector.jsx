import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';

import { SelectedColorContext } from './SelectedColorContext';
import { colorMap } from './colorMap';
import { TextInput } from './TextInput';

const StyledWrapper = styled.div`
    height: 100%;
    width: 100%;
`;

const StyledColorContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const StyledIcon = styled.div`
    height: 20px;
    width: 20px;
    background-color: ${({color}) => color};
    border: 1px solid black;
`;

const RadioWrapper = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: row;
`;

export const ColorSelector = ({onChange}) => {
    const [customVal, setCustomVal] = useState(null);
    const colorKeys = Object.keys(colorMap);

    const onRadioChange = (value) => {
        if(typeof onChange === 'function') {
            onChange(value);
        }
    }

    useEffect(() => {
        if(customVal !== null) {
            onRadioChange(customVal);
        }
    }, [customVal])

    const selectedColor = useContext(SelectedColorContext);
    return(
        <StyledWrapper>
            <h3>Select a color</h3>
            <StyledColorContainer>
            {
                colorKeys.map((key) => (
                    <RadioWrapper key={`color_${key}`}>
                        <input type="radio"
                            checked={key == selectedColor}
                            id={key}
                            name="selectedColor"
                            value={key}
                            onChange={() => {onRadioChange(key)}}/>
                        <StyledIcon color={colorMap[key]} />
                    </RadioWrapper>
                ))
            }
            </StyledColorContainer>
            <StyledColorContainer>
                <input type="radio"
                    checked={customVal == selectedColor}
                    id={customVal}
                    name="selectedColor"
                    value={customVal}
                    onChange={() => {onRadioChange(customVal)}}
                />
                <TextInput onChange={val => {setCustomVal(val)}} />
            </StyledColorContainer>
        </StyledWrapper>
    )
}