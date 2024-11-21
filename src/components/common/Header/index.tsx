import { RootState } from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button, Grid2, Container, Avatar, Stack, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const HeaderComp = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const { signOut } = useAuth();
  const {user} = useUser()

  const [openMenu, setOpenMenu] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpenMenu(false);
  };

  return (
    <div
      className="header-wrapper"
      style={{ background: theme.palette.primary.light }}
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
              onClick={() => setOpenMenu(true)}
              id="customized-button"
              aria-controls={openMenu ? "customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
            >
              <Avatar alt={user?.fullName as string} src={user?.imageUrl} />
              <span>{user?.firstName}</span>
            </Stack>
            <Menu
              id="customized-button"
              open={openMenu}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "customized-button",
              }}
            >
              <MenuItem>Setting</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
            {/* <Button variant="contained" onClick={() => signOut()}>
              Sign out
            </Button> */}
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
};

export default HeaderComp;
