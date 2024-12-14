import { RootState } from "@/store/index";
import { updateUserDetails } from "@/store/slice/userSlice";
import { useAuth } from "@clerk/nextjs";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FooterComp from "./Footer";
import HeaderComp from "./Header";
import PageLoader from "./PageLoader";
import { MainLayoutPropTypes } from "./MainLayout";
import { useGetRequestHandler } from "@/hooks/requestHandler";

const AuthWrapper = ({ userData, children }: MainLayoutPropTypes) => {
  const { isSignedIn, signOut } = useAuth();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, data, fetchData } = useGetRequestHandler(false);

  useEffect(() => {
    if (isSignedIn) {
      fetchData("/api/view-user");
    }
  }, [isSignedIn]);

  // update user details
  useEffect(() => {
    // dispatch(updateUserDetails({details: data, loading: isLoading}));
  }, [isLoading]);

  const isUserStateLoading = useSelector(
    (state: RootState) => state.user.loading
  );

  const isLoggedinRoute = false

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

export default AuthWrapper;
