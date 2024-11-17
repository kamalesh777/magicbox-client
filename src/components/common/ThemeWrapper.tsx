
import { RootState } from '@/store';
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from 'notistack';
import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux';

const ThemeWrapper = (props: PropsWithChildren) => {
  const themePaletteState = useSelector((state: RootState) => state?.theme);
  const theme = createTheme(themePaletteState as ThemeOptions);
  
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {props.children}
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        maxSnack={1}
      />
    </ThemeProvider>
  );
};

export default ThemeWrapper