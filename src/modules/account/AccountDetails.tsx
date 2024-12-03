import { Box, Grid, Grid2 } from '@mui/material'
import React from 'react'

interface PropTypes {
  data: {
    name?: string;
    email?: string;
    phone?: string;
    state?: string;
    address?: string;
    pincode?: string;
  };
}

const AccountDetails = ({data}: PropTypes) => {
  return (
        <Grid2 size={12}>Hello World</Grid2>

  );
}

export default AccountDetails