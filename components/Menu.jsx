import React from 'react';
import styled from 'styled-components';

import { Button } from './Button';

const StyledButtonBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
    flex-grow: 4;
    padding-top: 64px;
`

export const Menu = ({startJoin, startMake}) => {
    return (
        <div>
            <h3>Magic Matrix</h3>
            <StyledButtonBox>
                <Button width="33%" onClick={() => {startJoin()}}>Join A Table</Button>
                <Button width="33%" onClick={() => {startMake()}}>Make a Table</Button>
            </StyledButtonBox>
        </div>
    )
}