import React, {useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

import {IFileMeta, IPeerField} from 'src/types';
import pcConfig from 'src/utils/pcConfig';

const Wrapper = styled.div`
  position: absolute;
  bottom: 1em;
`;

const StyledButton = styled(Button)`
  background-color: ${(props) => props.theme.secondary.main};
  color: ${(props) => props.theme.secondary.contrastText};
  &:hover {
    background: ${(props) => props.theme.secondary.dark};
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
  // TODO-sprint: send to all existing peer when click on self - offline load and send when online?

  return (
    <Wrapper>
      <StyledButton variant="contained">You: {selfIdentity?.emoji}</StyledButton>
      <div>Test</div>
    </Wrapper>
  );
};

export default SelfConnectionHolder;
