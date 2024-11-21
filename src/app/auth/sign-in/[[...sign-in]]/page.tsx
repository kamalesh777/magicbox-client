import { SignIn } from '@clerk/nextjs'
import { Grid2 } from '@mui/material'
import React from 'react'

const SignInPage = () => {
  return (
    <div className="signinWrapper my-5">
      <Grid2
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <SignIn />
      </Grid2>
    </div>
  );
}

export default SignInPage