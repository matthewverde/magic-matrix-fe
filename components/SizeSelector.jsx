import React, {useCallback} from 'react';
import styled from 'styled-components';

import ReactSlider from 'react-slider';

const StyledWrapper = styled.div`
    height: 100%;
    width: 100%;
`;

const StyledSlider = styled(ReactSlider)`
    height: 100%;
    width: 25px;
`;

const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    background-color: #000;
    color: #fff;
    border-radius: 50%;
    cursor: grab;
`;

const Thumb = (props, state) => <StyledThumb {...props}>{state.valueNow}</StyledThumb>;

const StyledTrack = styled.div`
    left: 0;
    right: 0;
    background: #ddd;
    border-radius: 999px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

export const SizeSelector = ({onChange}) => {

    const onSliderChange = useCallback(value => {
        if(typeof onChange === 'function') {
            onChange(value);
        }
    }, [onChange]);

    return (
        <StyledWrapper>
            <StyledSlider
                invert
                min={10}
                max={100}
                defaultValue={[50]}
                renderTrack={Track}
                renderThumb={Thumb}
                orientation={'vertical'}
                onChange={onSliderChange}
            />
        </StyledWrapper>
    )
}