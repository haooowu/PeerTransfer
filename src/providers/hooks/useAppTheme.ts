import {useEffect, useState} from 'react';
import {APP_THEME} from 'src/constants';

type AppTheme = 'light' | 'dark';

export const useAppTheme = () => {
  const [appTheme, setAppTheme] = useState<'light' | 'dark'>('dark');

  const toggleLightDarkTheme = () => {
    let target: AppTheme = appTheme === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem(APP_THEME, target);
    setAppTheme(target);
  };

  useEffect(() => {
    const currentTheme = window.localStorage.getItem(APP_THEME);
    if (currentTheme) {
      setAppTheme(currentTheme as AppTheme);
    } else {
      window.localStorage.setItem(APP_THEME, 'dark');
    }
  }, []);

  return {
    appTheme,
    toggleLightDarkTheme,
  };
};
