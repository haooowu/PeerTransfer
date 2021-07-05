export const brightnessTheme = {
  light: {
    primary: {
      main: '#fff6ec',
      light: '#fff7ef',
      dark: '#b2aca5',
      contrastText: '#434343',
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
