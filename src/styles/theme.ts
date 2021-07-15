export const brightnessTheme = {
  light: {
    primary: {
      main: '#f1f0ea',
      light: '#f3f3ee',
      dark: '#aaaaa6',
      contrastText: '#008080',
    },
    secondary: {
      main: '#1565C0',
      dark: '#0e4686',
      light: '#4383cc',
      contrastText: '#fff',
    },
  },
  dark: {
    primary: {
      main: '#303846',
      light: '#595f6b',
      dark: '#212731',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1565C0',
      dark: '#0e4686',
      light: '#4383cc',
      contrastText: '#fff',
    },
  },
};

const theme = {
  drawerMinWidth: '55px',
  ...brightnessTheme.dark, // default dark
};

export default theme;
