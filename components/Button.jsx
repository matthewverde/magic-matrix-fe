import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.div`
    padding: 8px;
    border: 2px solid black;
    border-radius: 3px;
    :hover {
        cursor: pointer;
    }
    background-color: ${({color}) => color};
    ${({width}) => width && css`
        width: ${width};    
    `}
    font-weight: 500;
`;

export const Button = ({children, onClick, color = 'white', width}) => {
    const buttonOnClick = () => {
        if(typeof onClick === 'function') {
            onClick();
        }
    }
    return (
        <StyledButton onClick={() => {buttonOnClick()}} color={color} width={width}>
            {children}
        </StyledButton>
    )
}