import React, {useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

import {IFileMeta, IPeerField} from 'src/types';
import pcConfig from 'src/utils/pcConfig';

const Wrapper = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translateX(-50%);
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.secondary.main} !important;
  color: ${(props) => props.theme.secondary.contrastText} !important;
  &:hover {
    background: ${(props) => props.theme.secondary.dark} !important;
  }
`;

interface Props {
  selfIdentity: IPeerField;
  localID: string;
  publicID: string;
}

const SelfConnectionHolder: React.FC<Props> = ({selfIdentity, localID, publicID}) => {
  // TODO-sprint: peer icon styling (ripple effects)
  // TODO-sprint: once waiting connection / transferring disable event
  // TODO-sprint: send to all existing peer when click on self

  return (
    <Wrapper>
      <StyledButton variant="contained">You: {selfIdentity?.emoji}</StyledButton>
      <div>Test</div>
    </Wrapper>
  );
};

export default SelfConnectionHolder;
