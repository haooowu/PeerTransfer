import React, {useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';

import SelfConnectionHolder from 'src/components/SelfConnectionHolder';
import PeerConnectionHolder from 'src/components/PeerConnectionHolder';
import {IPeerField} from 'src/types';

interface Props {
  selfIdentity: IPeerField | null | undefined;
  publicID: string;
  localID: string;
}

// TODO-sprint: UI popup for join BY roomID dialog (that should only add to presenceDB)
// TODO-sprint: UI popup for general FAQ
// TODO-sprint: random position at larger media, otherwise overflow-scroll list in small

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

  return (
    <div>
      {selfIdentity && <SelfConnectionHolder publicID={publicID} localID={localID} selfIdentity={selfIdentity} />}
      {otherPeers.map((peer) => (
        <PeerConnectionHolder key={peer.id} targetPeer={peer} publicID={publicID} localID={localID} />
      ))}
    </div>
  );
};

export default PeersListener;
