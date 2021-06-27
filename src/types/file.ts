export interface IFileMeta {
  name: string;
  size: number;
  type: string;
}

export interface IDownloadableFile {
  fileBlobUrl: string;
  fileName: string;
}
