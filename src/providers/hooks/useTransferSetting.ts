import {useEffect, useState} from 'react';
import {APP_AUTO_ACCEPT, APP_AUTO_DOWNLOAD} from 'src/constants';

export const useTransferSetting = () => {
  const [shouldAutoAccept, setAutoAccept] = useState<boolean>(false);
  const [shouldAutoDownload, setAutoDownload] = useState<boolean>(false);

  const toggleAutoAccept = () => {
    window.localStorage.setItem(APP_AUTO_ACCEPT, (!shouldAutoAccept).toString());
    setAutoAccept(!shouldAutoAccept);
  };

  const toggleAutoDownload = () => {
    window.localStorage.setItem(APP_AUTO_DOWNLOAD, (!shouldAutoDownload).toString());
    setAutoDownload(!shouldAutoDownload);
  };

  useEffect(() => {
    const appAutoAccept = window.localStorage.getItem(APP_AUTO_ACCEPT);
    const appAutoDownload = window.localStorage.getItem(APP_AUTO_DOWNLOAD);

    let acceptSetting = appAutoAccept === 'false' || !appAutoAccept ? false : true;
    let downloadSetting = appAutoDownload === 'false' || !appAutoDownload ? false : true;

    setAutoAccept(acceptSetting);
    setAutoDownload(downloadSetting);
  }, []);

  return {
    shouldAutoAccept,
    shouldAutoDownload,
    toggleAutoAccept,
    toggleAutoDownload,
  };
};
