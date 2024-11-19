"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Provider } from "react-redux";
import { store } from "@/store";
import ThemeWrapper from "./ThemeWrapper";
import { Container, Grid2 } from "@mui/material";

export default function MainLayout(props: { children: React.ReactNode }) {
  //  const themePalette = useSelector((state: RootState) => state.theme);
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Provider store={store}>
            <ThemeWrapper>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  {props.children}
            </ThemeWrapper>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
