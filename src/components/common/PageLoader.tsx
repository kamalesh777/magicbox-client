import { Box, Grid2, LinearProgress } from '@mui/material';
import React from 'react'

const PageLoader = ({ width='50%' }) => {
  return (
    <Grid2
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
      className="vh-100"
    >
      <Box sx={{ width: width }}>
        <LinearProgress />
      </Box>
    </Grid2>
  );
}

export default PageLoader