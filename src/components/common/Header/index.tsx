import { RootState } from "@/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { Button, Grid, Container, Avatar, Stack, Menu, MenuItem } from "@mui/joy";
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
        <Grid container>
          <Grid>
            <h2>Magicbox.</h2>
          </Grid>
          <Grid className="d-flex justify-content-end">
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              onClick={() => setOpenMenu(true)}
              id="customized-button"
              aria-controls={open ? "customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar alt={user?.fullName as string} src={user?.imageUrl} />
              <span>{user?.firstName}</span>
            </Stack>
            
            {/* <Button variant="contained" onClick={() => signOut()}>
              Sign out
            </Button> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HeaderComp;
