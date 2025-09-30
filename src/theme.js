import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#24e007', // green
      contrastText: '#000000',
    },
    text: {
      primary: '#000000', // black
      secondary: '#000000',
    },
    background: {
      default: '#ffffff', // white
      paper: '#ffffff',
    },
    divider: 'rgba(0,0,0,0.12)'
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'default',
        elevation: 1,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000000',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        }
      }
    }
  },
  typography: {
    fontFamily: ['Poppins', 'Open Sans', 'Arial', 'sans-serif'].join(','),
  }
});

export default theme;
