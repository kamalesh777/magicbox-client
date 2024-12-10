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
import { usePathname } from "next/navigation";

interface PropTypes extends PropsWithChildren {
  userData: UserSliceTypes["details"];
}

const AuthWrapper = (props: PropTypes) => {
  const {userData, children} = props

  const { isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUserDetails(userData));
    
  }, [userData]);

  const isLoggedinRoute = isSignedIn && !pathname.includes('/logout')

  return !isLoaded ? (
    <PageLoader />
  ) : (
    <>
      {isLoggedinRoute && <HeaderComp />}
      <Box className={isLoggedinRoute ? "main-layout" : ""}>
        {children}
      </Box>
      <FooterComp />
    </>
  );
};



export default function MainLayout(props: PropTypes) {
  //  const themePalette = useSelector((state: RootState) => state.theme);
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Provider store={store}>
            <ThemeWrapper>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <Container maxWidth={false} disableGutters>
                <AuthWrapper userData={props.userData}>{props.children}</AuthWrapper>
              </Container>
            </ThemeWrapper>
          </Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
