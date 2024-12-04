import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { Grid2, Container, Avatar, Stack, Menu, MenuItem, Box, Skeleton, Button } from "@mui/material";
import {
  SettingsOutlined,
  ManageAccountsOutlined,
  PowerSettingsNewOutlined,
  ArrowDownward,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import ButtonWrapper from "@/components/wrapper/ButtonWrapper";

const HeaderComp = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { signOut } = useAuth();
  const {user, isLoaded} = useUser()

  const userState = useSelector((state: RootState) => state?.user?.details)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // signed out function to redirect to the sign in page
  const handleSignOut = async () => {
    const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/auth/sign-in';
    
    try {
      await signOut(); // Continue sign-out in the background
      router.push(signInUrl);
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <Box
      className="header-wrapper"
      // sx={{ background: (v) => console.log("===v", v) }}
      sx={{ background: (t) => t.palette.primary.light }}
    >
      <Container disableGutters>
        <Grid2 container>
          <Grid2>
            <Link href="/" legacyBehavior>
              <Box component="h2" className="cursor-pointer">
                Magicbox.
              </Box>
            </Link>
          </Grid2>
          <Grid2 size="grow" className="d-flex justify-content-end">
            {/* <ButtonWrapper className="mr-3">Play Now!</ButtonWrapper> */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              onClick={handleClick}
              className="cursor-pointer"
            >
              {!isLoaded ? (
                <>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={100} height={20} />
                </>
              ) : (
                <>
                  <Avatar alt={user?.fullName as string} src={user?.imageUrl} />
                  <Box>{userState?.name || user?.firstName || "Unknown"}</Box>
                  <KeyboardArrowDown />
                </>
              )}
            </Stack>
            <Menu
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              disableAutoFocusItem
              className="mt-2"
            >
              <Link legacyBehavior href="/account" className="">
                <MenuItem
                  selected={pathname === "/account"}
                  disabled={!userState?.is_owner}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ManageAccountsOutlined />
                    <Box>My Account</Box>
                  </Stack>
                </MenuItem>
              </Link>
              <MenuItem disabled={!userState?.is_owner}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <SettingsOutlined />
                  <Box>Setting</Box>
                </Stack>
              </MenuItem>

              <MenuItem onClick={handleSignOut}>
                <Stack
                  sx={{ color: (theme) => theme.palette.error.main }}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <PowerSettingsNewOutlined />
                  <Box>Signout</Box>
                </Stack>
              </MenuItem>
            </Menu>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default HeaderComp;
