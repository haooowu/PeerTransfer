import React, {useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import pcConfig from 'src/utils/pcConfig';

export interface IIdentityContextVariable {
  localID: string;
  publicID: string;
}

export const IdentityContext = React.createContext<IIdentityContextVariable>({
  localID: '',
  publicID: '',
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
    const pc = new RTCPeerConnection(pcConfig);
    channel = pc.createDataChannel('');
    pc.createOffer().then((offer) => pc.setLocalDescription(offer));

    pc.onicecandidate = (ice) => {
      if (!ice || !ice.candidate || !ice.candidate.candidate) {
        if (channel) channel.close();
        channel = null;
        pc.close();
        return;
      }
      let split = ice.candidate.candidate.split(' ');
      if (split[7] !== 'host') {
        if (!publicIP) setPublicID(btoa(split[4]));
        publicIP = split[4];
      }
    };

    setLocalID(uuidv4());
  }, []);

  return (
    <IdentityContext.Provider
      value={{
        localID,
        publicID,
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};

export default IdentityProvider;
