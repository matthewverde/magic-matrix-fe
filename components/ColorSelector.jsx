import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color'

import { SelectedColorContext } from './SelectedColorContext';
import { colorMap } from './colorMap';
import { TextInput } from './TextInput';

const StyledWrapper = styled.div`
    /* height: 100%;
    width: 100%; */
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

const PickerWrapper =  styled.div`
    position: relative;
`;

export const ColorSelector = ({onChange}) => {
    const [customVal, setCustomVal] = useState(null);
    const [colorHistory, addColor] = useState([]);
    const colorKeys = Object.keys(colorMap);

    const onPickerChange = (colorObj) => {
        const { hex } = colorObj;
        console.log(hex);
        if(typeof onChange === 'function') {
            onChange(hex);
        }
    }

    const onRadioChange = (value) => {
        if(colorHistory.indexOf(value) === -1) {
            addColor([...colorHistory,value]);
        }

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
            <PickerWrapper>
                <SketchPicker width={180} color={selectedColor} onChange={onPickerChange}/>
            </PickerWrapper>
        </StyledWrapper>
    )
}