import { SignUp } from "@clerk/nextjs";
import { Grid2 } from "@mui/material";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="signupWrapper my-5">
      <Grid2
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <SignUp />
      </Grid2>
    </div>
  );
};

export default SignUpPage;
