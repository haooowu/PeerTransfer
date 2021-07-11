import {useEffect, useState} from 'react';

type AppTheme = 'light' | 'dark';

export const useAppTheme = () => {
  const [appTheme, setAppTheme] = useState<'light' | 'dark'>('dark');

  const toggleLightDarkTheme = () => {
    let target: AppTheme = appTheme === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem('appTheme', target);
    setAppTheme(target);
  };

  useEffect(() => {
    const currentTheme = window.localStorage.getItem('appTheme');
    if (currentTheme) {
      setAppTheme(currentTheme as AppTheme);
    } else {
      window.localStorage.setItem('appTheme', 'dark');
    }
  }, []);

  return {
    appTheme,
    toggleLightDarkTheme,
  };
};
