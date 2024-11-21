import { Grid2 } from '@mui/material';
import React from 'react'

const FooterComp = () => {
  return (
    <div className="footerWrapper">
      <Grid2
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <div>Made by: Kamalesh Maity</div>
      </Grid2>
    </div>
  );
}

export default FooterComp