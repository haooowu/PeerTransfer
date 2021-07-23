import React, {useEffect} from 'react';
import firebase from 'src/services/firebase';
import {toast} from 'react-toastify';
import {v4 as uuidv4} from 'uuid';
import pcConfig from 'src/services/rtcPeerConnectionConfig';
import {PUBLIC_ID} from 'src/constants';

export interface IIdentityContextVariable {
  localID: string;
  publicID: string;
  setPublicID: React.Dispatch<React.SetStateAction<string>>;
}

export const IdentityContext = React.createContext<IIdentityContextVariable>({
  localID: '',
  publicID: '',
  setPublicID: () => undefined,
});

interface Props {
  children?: React.ReactNode;
}

const IdentityProvider = ({children}: React.PropsWithChildren<Props>) => {
  const [localID, setLocalID] = React.useState<string>('');
  const [publicID, setPublicID] = React.useState<string>('');

  useEffect(() => {
    let publicIP: string;
    let channel: RTCDataChannel | null;
    let pc: RTCPeerConnection | null = new RTCPeerConnection(pcConfig);
    channel = pc.createDataChannel('');
    pc.createOffer().then((offer) => pc?.setLocalDescription(offer));

    let sessionPublicID = sessionStorage.getItem(PUBLIC_ID);

    pc.onicecandidate = (ice) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) {
        if (channel) channel.close();
        channel = null;
        pc?.close();
        pc = null;
        return;
      }
      let split = ice.candidate.candidate.split(' ');
      if (split[7] !== 'host') {
        if (sessionPublicID) {
          setPublicID(sessionPublicID);
          return;
        }
        if (!publicIP) setPublicID(btoa(split[4]));
        publicIP = split[4];
      }
    };
    firebase
      .auth()
      .signInAnonymously()
      .then(() => setLocalID(uuidv4()))
      .catch(() => toast.error('Failed to connect to firebase, please check your internet connection and try again'));
  }, []);

  return (
    <IdentityContext.Provider
      value={{
        localID,
        publicID,
        setPublicID,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};

export default IdentityProvider;
