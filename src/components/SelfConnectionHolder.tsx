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

interface Props {
  selfIdentity: IPeerField;
  localID: string;
  publicID: string;
}

const SelfConnectionHolder: React.FC<Props> = ({selfIdentity, localID, publicID}) => {
  // TODO-sprint: peerID to connection map and receive progress callback？

  return (
    <Wrapper>
      <Button color="primary" variant="contained" disableTouchRipple>
        You: {selfIdentity?.emoji}
      </Button>
      <div>Test</div>
    </Wrapper>
  );
};

export default SelfConnectionHolder;
