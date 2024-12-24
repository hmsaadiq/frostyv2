import { createTheme } from '@mui/material/styles';
import { pink, brown } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: pink[300],
    },
    secondary: {
      main: brown[200],
    },
    background: {
      default: pink[50],
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
  },
});

export default theme;