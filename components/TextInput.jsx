import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const StyledTextInput = styled.input`
    border: 2px solid black;
    font-weight: 500;
    border-radius: 3px;
    ${({width}) => width && css`
        width: ${width};
    `}
    ${({height}) => height && css`
        height: ${height};
    `}
`;

export const TextInput = ({onChange, initialValue = null, width, height}) => {
    const [value, setValue] = useState(initialValue);

    const onTextChange = useCallback(e => {
        if(e && e.target && typeof e.target.value !== 'undefined') {
            setValue(e.target.value);
        };
    });

    useEffect(() => {
        onChange(value);
    }, [value]);

    return (
        <StyledTextInput type="text" onChange={onTextChange} value={value} width={width} height={height} />
    );
}