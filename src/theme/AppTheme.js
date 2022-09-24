
import { ThemeProvider } from '@emotion/react';
import { pokeTheme } from '.';
import { CssBaseline } from '@mui/material';

export const AppTheme = ({ children }) => {

  return (
    <ThemeProvider theme={ pokeTheme }>
      <CssBaseline />  
      { children }
    </ThemeProvider>
  )

};