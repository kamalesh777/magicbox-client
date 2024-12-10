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
import { usePathname, useRouter } from "next/navigation";

interface PropTypes extends PropsWithChildren {
  userData: UserSliceTypes["details"];
}

const AuthWrapper = (props: PropTypes) => {
  const {userData, children} = props

  const { isLoaded, isSignedIn, signOut } = useAuth();
  const pathname = usePathname()
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateUserDetails(userData));
    if (window !== undefined && !!userData) {
      const host = window.location.host;
      const { workspace_url, created_by } = userData;
      if (workspace_url !== host) {
        const redirectUrl = workspace_url?.startsWith("http")
          ? workspace_url
          : `https://${workspace_url}`;
        
        signOut() // before redirect signout this user
        return router.replace(redirectUrl as string);
      }
      if (created_by) {
        return router.push("/account");
      }
    }

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
