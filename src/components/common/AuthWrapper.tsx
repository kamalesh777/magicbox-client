

import { RootState } from '@/store/index';
import { updateUserDetails } from '@/store/slice/userSlice';
import { useAuth } from '@clerk/nextjs';
import { Box } from '@mui/material';
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FooterComp from './Footer';
import HeaderComp from './Header';
import PageLoader from './PageLoader';
import { MainLayoutPropTypes } from './MainLayout';

const AuthWrapper = ({ userData, children }: MainLayoutPropTypes) => {
  const { isSignedIn, signOut } = useAuth();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const isUserStateLoading = useSelector(
    (state: RootState) => state.user.loading
  );

  useEffect(() => {
    if (!!userData) {
      dispatch(updateUserDetails({ details: userData, loading: false }));

      const host = window.location.host;
      const { workspace_url, created_by } = userData || {};

      if (workspace_url !== host) {
        const redirectUrl = workspace_url?.startsWith("http")
          ? workspace_url
          : `https://${workspace_url}`;

        signOut(); // before redirect, sign out this user
        router.replace(redirectUrl as string);
        return ; // Exit early to prevent further execution
      }

      if (created_by) {
        router.push("/account");
        return; // Exit early to prevent further execution
      }
    } 
  }, [JSON.stringify(userData)]);

  const isLoggedinRoute = isSignedIn && !pathname.includes("/logout");

  return isLoggedinRoute ? (
    isUserStateLoading ? (
      <PageLoader />
    ) : (
      <>
        <HeaderComp />
        <Box className="main-layout">{children}</Box>
        <FooterComp />
      </>
    )
  ) : (
    <Box>{children}</Box>
  );
};

export default AuthWrapper