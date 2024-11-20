import { useAuth } from '@clerk/nextjs';
import { Button, Grid2, Container } from "@mui/material";
import React from 'react'

const HeaderComp = () => {
  const {signOut} = useAuth()
  return (
    <div className="header-wrapper">
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
}

export default HeaderComp