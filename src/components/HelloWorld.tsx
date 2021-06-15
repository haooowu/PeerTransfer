import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Button} from '@material-ui/core';
import backgroundRipple from 'src/assets/backgroundRipple.svg';
import {IdentityContext, IIdentityContextVariable} from 'src/components/IdentityProvider';

// import firebase from 'src/services/firebase';

const StyledP = styled.p``;

const RippleHolder = styled.div`
  position: absolute;
  bottom: 0;
  background-image: url(${backgroundRipple});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  width: 100%;
  max-width: 1200px;
  height: 600px;
  z-index: -1;
`;

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

interface Props {
  localID: string;
  publicID: string;
}

const ConsumedHelloWorld: React.FC<Props> = ({publicID, localID}) => {
  useEffect(() => {
    if (!localID || !publicID) return;
    console.log(localID);
    console.log(publicID);
    return () => {};
  }, [publicID, localID]);

  return (
    <Wrapper>
      <StyledP>Hello World</StyledP>
      <Button color="primary" variant="contained" disableTouchRipple>
        Test
      </Button>
      <RippleHolder />
    </Wrapper>
  );
};

const HelloWorld = () => (
  <IdentityContext.Consumer>
    {({localID, publicID}: IIdentityContextVariable) => <ConsumedHelloWorld localID={localID} publicID={publicID} />}
  </IdentityContext.Consumer>
);

export default HelloWorld;
