import {IFileMeta} from './file';

export interface IConnectionField {
  answer?: any;
  offer?: any;
  fileMeta?: IFileMeta;
  p2p: {
    p1: string;
    p2: string;
  };
}
