import React, {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import { SketchPicker } from 'react-color'

import { SelectedColorContext } from './SelectedColorContext';

const StyledWrapper = styled.div`
    /* height: 100%;
    width: 100%; */
`;

const PickerWrapper =  styled.div`
    position: relative;
`;

export const ColorSelector = ({onChange}) => {
    const [customVal, setCustomVal] = useState(null);
    const [colorHistory, addColor] = useState([]);

    const onPickerChange = (colorObj) => {
        const { hex } = colorObj;
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