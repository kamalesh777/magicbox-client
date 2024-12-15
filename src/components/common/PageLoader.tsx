import { Box, Grid2, LinearProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RefreshOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const PageLoader = ({ width = "50%" }) => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => router.refresh(), 10000);
  }, []);

  return (
    <Grid2
      container
      alignItems="center"
      justifyContent="center"
      className="vh-100 w-100"
    >
      <Box sx={{ width: width }}>
        <Box className="text-center">Please wait... </Box>
        <LinearProgress />
      </Box>
    </Grid2>
  );
};

export default PageLoader;
