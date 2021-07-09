import {IFileMeta} from './file';

export interface IPeerField {
  emoji: string;
  id: string;
  browser: string;
  platform: string;
}

export interface IFirebaseConnectionRoomData {
  answer: {
    type: RTCSdpType;
    sdp: string;
  };
  offer: {
    type: RTCSdpType;
    sdp: string;
  };
  isAccepting: boolean;
  fileMetas: IFileMeta[];
  p2p: {
    answer: string;
    offer: string;
  };
}

export type EnterType = 'drag' | 'mouse' | null;
