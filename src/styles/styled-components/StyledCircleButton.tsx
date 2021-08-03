import {rgba} from 'polished';
import styled, {keyframes} from 'styled-components';
import {Button} from '@material-ui/core';

const rippleColor = rgba('#468266', 0.3);

const normalCircleRipple = keyframes`
  0% {
    box-shadow: 
      0 0 0 0 ${rippleColor}, 
      0 0 0 0.5em ${rippleColor};
  }
  100% {
    box-shadow:
      0 0 0 0.5em ${rippleColor}, 
      0 0 0 1.5em transparent;
  }
`;

const extendCircleRipple = keyframes`
  0% {
    box-shadow: 
      0 0 0 0 ${rippleColor}, 
      0 0 0 1em ${rippleColor}, 
      0 0 0 2em ${rippleColor};
  }
  100% {
    box-shadow:
      0 0 0 1em ${rippleColor}, 
      0 0 0 2em ${rippleColor},
      0 0 0 3.5em transparent;
  }
`;

const StyledCircleButton = styled(Button)`
  background-color: ${(props) => props.theme.secondary.main} !important;
  color: ${(props) => props.theme.secondary.contrastText} !important;
  &:hover {
    background: ${(props) => props.theme.secondary.dark} !important;
  }
  border-radius: 50% !important;
  height: 64px;
  width: 64px;
  span.MuiButton-label {
    font-size: 25px;
    width: 25px;
  }
`;

export const PeerStyledCircleButton = styled(StyledCircleButton)`
  animation: ${normalCircleRipple} 1s linear infinite;
`;

export const OwnStyledCircleButton = styled(StyledCircleButton)`
  animation: ${extendCircleRipple} 0.7s linear infinite;
`;
