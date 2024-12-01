import { Box, Grid2 } from '@mui/material';
import React from 'react'

const FooterComp = () => {
  return (
    <Box className="footerWrapper" sx={{bgcolor: 'lightgrey'}}>
      <Grid2
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <div>Made by: Kamalesh Maity</div>
      </Grid2>
    </Box>
  );
}

export default FooterComp