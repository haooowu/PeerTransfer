import styled from 'styled-components';
import breakpoints from 'src/styles/breakpoints';

const StyledPeerPosition = styled.div`
  .peerHolder {
    border-radius: 50%;
    width: 64px;
    height: 64px;
    position: absolute;
    z-index: 1;
    @media only screen and (${breakpoints.sm}) {
      position: relative;
      bottom: unset !important;
      left: unset !important;
      right: unset !important;
      transform: unset !important;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 3em;
    }
  }
  & .peerHolder:nth-child(1) {
    bottom: 33%;
    left: 50%;
    transform: translateX(-50%);
  }
  & .peerHolder:nth-child(2) {
    bottom: 20%;
    left: 30%;
  }
  & .peerHolder:nth-child(3) {
    bottom: 20%;
    right: 30%;
  }
  & .peerHolder:nth-child(4) {
    bottom: 58%;
    left: 50%;
    transform: translateX(-50%);
  }
  & .peerHolder:nth-child(5) {
    bottom: 30%;
    left: 20%;
  }
  & .peerHolder:nth-child(6) {
    bottom: 30%;
    right: 20%;
  }
  & .peerHolder:nth-child(7) {
    bottom: 10%;
    left: 15%;
  }
  & .peerHolder:nth-child(8) {
    bottom: 10%;
    right: 15%;
  }
  & .peerHolder:nth-child(9) {
    bottom: 44%;
    left: 35%;
  }
  & .peerHolder:nth-child(10) {
    bottom: 44%;
    right: 35%;
  }
`;

export default StyledPeerPosition;
