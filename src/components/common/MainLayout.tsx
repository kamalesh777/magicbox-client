"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/store/index";
import ThemeWrapper from "./ThemeWrapper";
import { Box, Container, Grid2 } from "@mui/material";
import HeaderComp from "./Header";
import { useAuth } from "@clerk/nextjs";
import FooterComp from "./Footer";
import PageLoader from "./PageLoader";
import { updateUserDetails, UserSliceTypes } from "@/store/slice/userSlice";
import { useGetRequestHandler } from "@/hooks/requestHandler";

interface PropTypes extends PropsWithChildren {
  userData: UserSliceTypes["details"];
}

const AuthWrapper = (props: PropsWithChildren) => {
  const { isLoaded, isSignedIn } = useAuth();
  const dispatch = useDispatch();
  const {isLoading, data, fetchData} = useGetRequestHandler()

  useEffect(() => {
    if (isSignedIn) {
      fetchData('/api/view-user')
    }
    
  }, [isSignedIn]);

  useEffect(() => {
    if (!isLoading) dispatch(updateUserDetails(data));
  }, [isLoading]);

  return !isLoaded && isLoading ? (
      <PageLoader />
  ) : (
    <>
      {isSignedIn && <HeaderComp />}
      <Box className={isSignedIn ? "main-layout" : ""}>{props.children}</Box>
      <FooterComp />
    </>
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
