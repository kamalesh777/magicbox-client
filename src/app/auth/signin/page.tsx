import { AccountCircle } from '@mui/icons-material';
import { Box, Card, CardContent, FormControl, Grid2, TextField } from '@mui/material';
import React from 'react'

const SignInPage = () => {
  return (
    <Box className="login-wrapper">
      <Card>
        <CardContent>
          <form>
            <Grid2 container spacing={2}>
              <Grid2 size={{ md: 12 }}>
                <TextField fullWidth size="small" label="Name" id="name" />
              </Grid2>
              <Grid2 size={12}>
                <TextField fullWidth size="small" label="Email" id="email" />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  size="small"
                  label="Company"
                  id="company"
                />
              </Grid2>
            </Grid2>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignInPage