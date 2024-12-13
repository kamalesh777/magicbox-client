
"use client";

import React, { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Provider } from "react-redux";
import { store } from "@/store/index";
import ThemeWrapper from "./ThemeWrapper";
import { Container } from "@mui/material";
import {
  UserSliceTypes,
} from "@/store/slice/userSlice";
import AuthWrapper from "./AuthWrapper";

export interface MainLayoutPropTypes extends PropsWithChildren {
  userData: UserSliceTypes["details"];
}

export default function MainLayout({ userData, children }: MainLayoutPropTypes) {
  
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Provider store={store}>
            <ThemeWrapper>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <Container maxWidth={false} disableGutters>
                <AuthWrapper userData={userData}>{children}</AuthWrapper>
              </Container>
            </ThemeWrapper>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
