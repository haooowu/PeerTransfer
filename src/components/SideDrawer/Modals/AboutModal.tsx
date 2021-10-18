import React from 'react';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {MAXIMUM_FILE_BYTE, MAXIMUM_FILE_NUMBER, MAXIMUM_PEER_NUMBER} from 'src/constants';

import readableBytes from 'src/utils/readableBytes';

const CustomLabel = styled.div`
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 1em;
`;

interface Props {
  open: boolean;
  handleClose: () => void;
}

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AboutModal: React.FC<Props> = ({open, handleClose}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <CustomLabel>About</CustomLabel>
        <DialogContentText>
          This App uses <strong>WebRTC</strong> for secure end-to-end peer connection (you can{' '}
          <Link color="secondary" href="https://test.webrtc.org/" rel="noreferrer" target="_blank">
            test here
          </Link>
          ), together with free STUN server from Google, and Firebase for signalling service and peer presence
          management. Only the following data is used by Firebase for WebRTC signalling:
          <ul>
            <li>File metadata including file name, size and type</li>
            <li>ICE candidate descriptions, offers and answers that contain SDP information.</li>
            <li>Your public IP address is also used and served as the default room ID (in base64 encoded format). </li>
          </ul>
          You can also join another network room by entering their ID, or create custom ones from your own.
        </DialogContentText>

        <CustomLabel>Get Started</CustomLabel>
        <DialogContentText>
          Peers in the same network or room ID should appear in the app with their device and browser info, start
          transfer file by drag and drop files or click their emoji to select files for transfer.
        </DialogContentText>

        <DialogContentText>
          You can swipe right or click the drawer menu icon to see the app settings and your current room ID.
        </DialogContentText>

        <DialogContentText>
          Maximum file size is set to <strong>{readableBytes(MAXIMUM_FILE_BYTE, 0)}</strong>, with up to{' '}
          <strong>{MAXIMUM_FILE_NUMBER}</strong> file peer transfer and up to <strong>{MAXIMUM_PEER_NUMBER}</strong>{' '}
          peers each room.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;
