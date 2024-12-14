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

const AuthWrapper = ({ userData, children }: MainLayoutPropTypes) => {
  const { isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const isUserStateLoading = useSelector(
    (state: RootState) => state.user.loading
  );

  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Helper function to handle redirection
    const handleRedirection = async () => {
      if (!userData) {
        console.log("Redirecting: No user data, going to /workspace");
        await router.push("/workspace");
        return;
      }

      const { workspace_url, created_by } = userData;
      const currentHost = window.location.host;

      if (workspace_url && workspace_url !== currentHost) {
        const redirectUrl = workspace_url.startsWith("http")
          ? workspace_url
          : `https://${workspace_url}`;

        console.log("Redirecting: Mismatched workspace, going to", redirectUrl);
        await router.replace(redirectUrl);
        return;
      }

      if (created_by) {
        console.log("Redirecting: User is a creator, going to /account");
        await router.push("/account");
        return;
      }

      console.log("No redirection needed");
    };

    handleRedirection();

    // Always update user details in Redux store
    dispatch(updateUserDetails({ details: userData, loading: false }));
  }, [userData, router, dispatch]);

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

export default AuthWrapper;
