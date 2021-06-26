import React, {useState, useLayoutEffect} from 'react';
import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';
import {DATA_CHANNEL_TIMEOUT} from 'src/constants';

const StyledAlert = styled(Alert)`
  position: absolute;
  z-index: 9;
  top: 10px;
  width: 80%;
  left: 50%;
  cursor: pointer;
  transform: translateX(-50%);
`;

interface Props {}

const TimeoutAlert: React.FC<Props> = () => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  useLayoutEffect(() => {
    if (sessionStorage.getItem(DATA_CHANNEL_TIMEOUT)) {
      setShowSnackBar(true);
      sessionStorage.removeItem(DATA_CHANNEL_TIMEOUT);
    }
  }, []);

  const closeAlert = () => setShowSnackBar(false);

  if (!showSnackBar) return null;

  return (
    <StyledAlert onClick={closeAlert} onClose={closeAlert} severity="warning">
      Failed to create a stable data channel, please try again
    </StyledAlert>
  );
};

export default TimeoutAlert;
