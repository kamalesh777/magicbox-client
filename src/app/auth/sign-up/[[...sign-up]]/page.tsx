import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  Stack,
  TextField,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";

const SignUpPage = () => {
  
  return (
    <Box className="login-wrapper">
      <Card>
        <CardContent>
          <h2 className="mt-3">Register Now!</h2>
          <p>
            If you already have a company then{" "}
            <Link href="/auth/login">Login</Link>
          </p>
          <form className="mt-4">
            <Grid2 container spacing={2}>
              <Grid2 size={12}>
                <TextField fullWidth size="small" label="Name" id="name" />
              </Grid2>
              <Grid2 size={12}>
                <TextField fullWidth size="small" label="Email" id="email" />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Password"
                  id="password"
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Company"
                  id="company"
                />
              </Grid2>
              <Grid2 size={12}>
                <Button variant="contained" className="w-100">
                  Register!
                </Button>
              </Grid2>
            </Grid2>
          </form>
          <Divider className="my-4">Or sign up using</Divider>
          {/* <p className="text-center">Sign up using</p> */}
          <Stack direction="row" className="justify-content-center mt-3" spacing={2}>
            <div className="social-signin">
              <FaGoogle />
            </div>
            <div className="social-signin">
              <FaFacebookF />
            </div>
            <div className="social-signin">
              <FaGithub />
            </div>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SignUpPage;
