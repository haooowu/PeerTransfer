import React, {useState, useEffect} from 'react';
import firebase from 'src/services/firebase';
import styled from 'styled-components';
import {Button} from '@material-ui/core';

import PeerConnectionHolder from 'src/components/PeerConnectionHolder';
import {IPeerField} from 'src/types';

interface Props {
  publicID: string;
  localID: string;
}

const PeersListener: React.FC<Props> = ({publicID, localID}) => {
  const [otherPeers, setOtherPeers] = useState<IPeerField[]>([]);

  useEffect(() => {
    const listenPeers = async () => {
      const db = firebase.firestore();
      const roomRef = await db.collection('rooms').doc(publicID);
      const peers = roomRef.collection('peers') as firebase.firestore.CollectionReference<IPeerField>;
      peers.onSnapshot(async (snapshot) => {
        const peerCollection = snapshot.docs;
        const otherPeers = peerCollection.filter((peer) => peer.id !== localID).map((peer) => peer.data());
        setOtherPeers(otherPeers);
      });
    };
    listenPeers();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {otherPeers.map((peer) => (
        <PeerConnectionHolder targetPeer={peer} publicID={publicID} localID={localID} />
      ))}
    </div>
  );
};

export default PeersListener;
