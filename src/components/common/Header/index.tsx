import { useState } from "react";
import { RootState } from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Grid2, Container, Avatar, Stack, Menu, MenuItem, Box, Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import {
  SettingsOutlined,
  ManageAccountsOutlined,
  PowerSettingsNewOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

const HeaderComp = () => {
  const { signOut } = useAuth();
  const {user, isLoaded} = useUser()
  const router = useRouter()

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
          <Grid2 size={6}>
            <h2>Magicbox.</h2>
          </Grid2>
          <Grid2 size={6} className="d-flex justify-content-end">
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              onClick={handleClick}
            >
              {!isLoaded ? (
                <>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={100} height={20} />
                </>
              ) : (
                <>
                  <Avatar alt={user?.fullName as string} src={user?.imageUrl} />
                  <Box>{user?.firstName}</Box>
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
              <MenuItem>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <ManageAccountsOutlined />
                  <Box>My account</Box>
                </Stack>
              </MenuItem>
              <MenuItem>
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
