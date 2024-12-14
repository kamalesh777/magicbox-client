
"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { Provider } from "react-redux";
import { store } from "@/store/index";
import ThemeWrapper from "./ThemeWrapper";
import { Container } from "@mui/material";
import {
  UserSliceTypes,
} from "@/store/slice/userSlice";
import AuthWrapper from "./AuthWrapper";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export interface MainLayoutPropTypes extends PropsWithChildren {
  userData: UserSliceTypes["details"];
}

export default function MainLayout({ userData, children }: MainLayoutPropTypes) {

  const {signOut} = useAuth();
  const router = useRouter();

  useEffect(() => {

    if (userData) {
      const host = window.location.host;
      const { workspace_url, created_by } = userData || {};

      if (workspace_url !== host) {
        const redirectUrl = workspace_url?.startsWith("http")
          ? workspace_url
          : `https://${workspace_url}`;

        signOut(); // before redirect, sign out this user
        router.replace(redirectUrl as string);
        return; // Exit early to prevent further execution
      } else if (created_by) {
        router.push("/account");
      } else {
        router.push("/workspace");
      }
    } 
  }, [userData, router]);
  
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
