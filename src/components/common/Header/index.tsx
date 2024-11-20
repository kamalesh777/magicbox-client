import { RootState } from "@/store";
import { useAuth } from "@clerk/nextjs";
import { Button, Grid2, Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const HeaderComp = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const { signOut } = useAuth();
  return (
    <div className="header-wrapper" style={{ background: theme.palette.primary.light }}>
      <Container>
        <Grid2 container>
          <Grid2 size={6}>
            <h2>Magicbox.</h2>
          </Grid2>
          <Grid2 size={6} className="d-flex justify-content-end">
            <Button variant="contained" onClick={() => signOut()}>
              Sign out
            </Button>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
};

export default HeaderComp;
