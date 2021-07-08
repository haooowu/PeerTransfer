import React, {useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';

import SelfConnectionHolder from 'src/components/SelfConnectionHolder';
import PeerConnectionHolder from 'src/components/PeerConnectionHolder';
import {IPeerField} from 'src/types';

// TODO-sprint: wrap peers solely
const PeersHolder = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  .test {
    background-color: wheat;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: absolute;
  }
  & .test:nth-child(1) {
    bottom: 33%; // 280px
    left: 50%;
    transform: translateX(-50%);
  }
  & .test:nth-child(2) {
    bottom: 20%; // 160px
    left: 30%;
  }
  & .test:nth-child(3) {
    bottom: 20%; // 160px
    right: 30%;
  }
  & .test:nth-child(4) {
    bottom: 58%; // 480px;
    left: 50%;
    transform: translateX(-50%);
  }
  & .test:nth-child(5) {
    bottom: 30%; // 300px;
    left: 20%;
  }
  & .test:nth-child(6) {
    bottom: 30%; // 300px;
    right: 20%;
  }
  & .test:nth-child(7) {
    bottom: 10%; // 120px;
    left: 15%;
  }
  & .test:nth-child(8) {
    bottom: 10%; // 120px;
    right: 15%;
  }
  & .test:nth-child(9) {
    bottom: 44%; // 380px;
    left: 35%;
  }
  & .test:nth-child(10) {
    bottom: 44%; // 380px;
    right: 35%;
  }
`;

interface Props {
  selfIdentity: IPeerField | null | undefined;
  publicID: string;
  localID: string;
}

// TODO-sprint: UI popup for join BY roomID dialog (that should only add to presenceDB)
// TODO-sprint: UI popup for general FAQ - data disclaimer, browser support, file and size limit
// TODO-sprint: fixed position at larger media, otherwise overflow-scroll card list in small
// TODO-sprint: optimize snapshot listeners
// TODO-sprint: provide db as firebase provider?
// const db = firebase.firestore();
// const roomRef = db.collection('rooms').doc(publicID);

const PeersListener: React.FC<Props> = ({selfIdentity, publicID, localID}) => {
  const [otherPeers, setOtherPeers] = useState<IPeerField[]>([]);
  const [sendAllFiles, setSendAllFiles] = useState<File[]>([]);

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
        setOtherPeers(peerHolder);
      });
    };
    listenPeers();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFileInputChange(files: File[]) {
    if (files.length > 0) {
      console.log('files: ', files);
      // TODO-sprint: send all
    }
  }

  let positionTest = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <PeersHolder id="peers-holder">
      {positionTest.map((a) => (
        <div className="test" key={a}>
          {a}
        </div>
      ))}
      {otherPeers.map((peer) => (
        <PeerConnectionHolder key={peer.id} targetPeer={peer} publicID={publicID} localID={localID} />
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

export default PeersListener;
