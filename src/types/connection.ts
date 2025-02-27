import { IFileMeta } from "./file";

export interface IConnectionField {
  answer?: unknown;
  offer?: unknown;
  fileMeta?: IFileMeta;
  p2p: {
    p1: string;
    p2: string;
  };
}
