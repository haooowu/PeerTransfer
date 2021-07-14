import React from 'react';
import {useAppTheme, useTransferSetting} from 'src/providers/hooks';

export interface IAppSettingContextVariable {
  shouldAutoAccept: boolean;
  shouldAutoDownload: boolean;
  appTheme: 'light' | 'dark';
  toggleAutoAccept: () => void;
  toggleAutoDownload: () => void;
  toggleLightDarkTheme: () => void;
}

export const AppSettingContext = React.createContext<IAppSettingContextVariable>({
  shouldAutoAccept: false,
  shouldAutoDownload: false,
  appTheme: 'dark',
  toggleAutoAccept: () => undefined,
  toggleAutoDownload: () => undefined,
  toggleLightDarkTheme: () => undefined,
});

interface Props {
  children?: React.ReactNode;
}

const AppSettingProvider = ({children}: React.PropsWithChildren<Props>) => {
  const {shouldAutoAccept, shouldAutoDownload, toggleAutoAccept, toggleAutoDownload} = useTransferSetting();

  const {appTheme, toggleLightDarkTheme} = useAppTheme();

  return (
    <AppSettingContext.Provider
      value={{
        shouldAutoAccept,
        shouldAutoDownload,
        appTheme,
        toggleAutoAccept,
        toggleAutoDownload,
        toggleLightDarkTheme,
      }}
    >
      {children}
    </AppSettingContext.Provider>
  );
};

export default AppSettingProvider;
