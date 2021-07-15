import React, {memo, useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';
import StyledPeerPosition from 'src/styles/StyledPeerPosition';
import SelfConnectionHolder from 'src/components/SelfConnectionHolder';
import PeerConnectionHolder from 'src/components/PeerConnectionHolder';
import {IPeerField} from 'src/types';
import {toast} from 'react-toastify';
import {MAXIMUM_PEER_NUMBER} from 'src/constants';

const PeersHolder = styled(StyledPeerPosition)`
  position: relative;
  height: 100%;
  width: 100%;
`;

interface Props {
  selfIdentity: IPeerField | null | undefined;
  publicID: string;
  localID: string;
}

// TODO-sprint: UI popup for join BY roomID dialog (that should only add to presenceDB, child(publicID) remove, then add another new publicID)

// TODO-sprint: UI popup for general FAQ - data disclaimer, browser support, file and size limit

const PeersListener: React.FC<Props> = ({selfIdentity, publicID, localID}) => {
  const [otherPeers, setOtherPeers] = useState<IPeerField[]>([]);
  const [sendAllFiles, setSendAllFiles] = useState<File[]>([]);

  const dbRef = React.useRef(firebase.firestore());

  useEffect(() => {
    const listenPeers = async () => {
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
    };
    listenPeers();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFileInputChange(files: File[]) {
    setSendAllFiles(files);
  }

  function clearSentAllFiles() {
    if (sendAllFiles.length > 0) setSendAllFiles([]);
  }

  return (
    <PeersHolder id="peers-holder">
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
      {selfIdentity && (
        <SelfConnectionHolder
          shouldDisableActionBtn={sendAllFiles.length > 0}
          handleFileInputChange={handleFileInputChange}
          publicID={publicID}
          localID={localID}
          selfIdentity={selfIdentity}
        />
      )}
    </PeersHolder>
  );
};

export default memo(PeersListener);
