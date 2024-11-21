"use client";

import React, { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Provider } from "react-redux";
import { store } from "@/store";
import ThemeWrapper from "./ThemeWrapper";
import { Container, Skeleton } from "@mui/material";
import HeaderComp from "./Header";
import { useAuth } from "@clerk/nextjs";
import FooterComp from "./Footer";

const AuthWrapper = (props: PropsWithChildren) => {
    const { isLoaded, isSignedIn } = useAuth();
    return (
      !isLoaded ? <Skeleton /> : (
        <>
          {isSignedIn && <HeaderComp />}
          {props.children}
          <FooterComp />
        </>
      )
    );
  };

export default function MainLayout(props: PropsWithChildren) {
  //  const themePalette = useSelector((state: RootState) => state.theme);
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Provider store={store}>
            <ThemeWrapper>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <Container maxWidth={false} disableGutters>
                <AuthWrapper>
                  {props.children}
                </AuthWrapper>
              </Container>
            </ThemeWrapper>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
