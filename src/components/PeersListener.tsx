import React, {memo, useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';
import breakpoints from 'src/styles/breakpoints';
import StyledPeerPosition from 'src/styles/styled-components/StyledPeerPosition';
import SelfFileDropZone from 'src/components/DropZone/SelfFileDropZone';
import PeerConnectionHolder from 'src/components/PeerConnectionHolder';
import {IPeerField} from 'src/types';
import {toast} from 'react-toastify';
import {MAXIMUM_PEER_NUMBER} from 'src/constants';

const StyledP = styled.p`
  color: ${(props) => props.theme.primary.contrastText};
`;

const PeersHolder = styled(StyledPeerPosition)`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  overflow-y: auto;
  padding-top: 1em;
  padding-bottom: 100px;
  @media only screen and (${breakpoints.sm}) {
    padding-bottom: 0;
    margin-bottom: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

interface Props {
  selfIdentity: IPeerField | null | undefined;
  publicID: string;
  localID: string;
}

const PeersListener: React.FC<Props> = ({selfIdentity, publicID, localID}) => {
  const [otherPeers, setOtherPeers] = useState<IPeerField[]>([]);
  const [sendAllFiles, setSendAllFiles] = useState<File[]>([]);

  const dbRef = React.useRef(firebase.firestore());

  useEffect(() => {
    const db = firebase.database();
    const peersRef = db.ref(`${publicID}`);
    peersRef.on('value', async (snapshot) => {
      const allPeers: IPeerField[] = snapshot.val();
      let peerHolder: IPeerField[] = [];
      for (let id in allPeers) {
        if (id !== localID) peerHolder.push(allPeers[id]);
      }
      if (peerHolder.length > MAXIMUM_PEER_NUMBER) {
        toast.dismiss();
        toast.warn(`The maximum concurrent peers is set to ${MAXIMUM_PEER_NUMBER}`);
      } else {
        setOtherPeers(peerHolder);
      }
    });

    return () => {
      peersRef.off();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicID]);

  function handleFileInputChange(files: File[]) {
    if (otherPeers.length === 0) {
      toast.warn('There is no other peers in this room');
      clearSentAllFiles();
    } else {
      setSendAllFiles(files);
    }
  }

  function clearSentAllFiles() {
    if (sendAllFiles.length > 0) setSendAllFiles([]);
  }

  return (
    <>
      <StyledP>Hello World</StyledP>
      <PeersHolder>
        {otherPeers.map((peer) => (
          <PeerConnectionHolder
            clearSentAllFiles={clearSentAllFiles}
            sendAllFiles={sendAllFiles}
            firestoreDbRef={dbRef.current}
            key={peer.id}
            targetPeer={peer}
            publicID={publicID}
            localID={localID}
          />
        ))}
      </PeersHolder>
      {selfIdentity && (
        <SelfFileDropZone
          shouldDisableActionBtn={sendAllFiles.length > 0}
          handleFileInputChange={handleFileInputChange}
          publicID={publicID}
          localID={localID}
          selfIdentity={selfIdentity}
        />
      )}
    </>
  );
};

export default memo(PeersListener);
