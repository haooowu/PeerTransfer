import React, {useEffect} from 'react';
import stunConfig from 'src/utils/stunConfig';

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
    let localIP: string, externalIP: string;
    let channel: RTCDataChannel | null;
    const pc = new RTCPeerConnection(stunConfig);
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
      if (split[7] === 'host') {
        if (!localIP) setLocalID(btoa(split[4]));
        localIP = split[4];
      } else {
        if (!externalIP) setPublicID(btoa(split[4]));
        externalIP = split[4];
      }
    };
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
