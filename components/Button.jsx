import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link'

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

export const Button = ({children, onClick, color = 'white', width, href = null}) => {
    const buttonOnClick = () => {
        if(typeof onClick === 'function') {
            onClick();
        }
    }

    const usingLink = href !== null;
    return (
        <StyledButton onClick={() => {buttonOnClick()}} color={color} width={width}>
            {
                usingLink ? (
                    <Link href={href}>
                        {children}
                    </Link>
                ) :
                children
            }
            
        </StyledButton>
    )
}