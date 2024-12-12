

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

  console.log("===userData auth page", userData);
  useEffect(() => {
    if (!!userData) {
      dispatch(updateUserDetails({ details: userData, loading: false }));
    }
  }, [JSON.stringify(userData)]);

  const isLoggedinRoute = isSignedIn && !pathname.includes("/logout");

  return isLoggedinRoute ? (
    <PageLoader />
  ) : (
    <>
      {isLoggedinRoute && <HeaderComp />}
      <Box className={isLoggedinRoute ? "main-layout" : ""}>{children}</Box>
      <FooterComp />
    </>
  );
};

export default AuthWrapper