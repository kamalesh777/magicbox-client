import routesObj from '@/constants/ApiConstant'
import { fetchServerSideData } from '@/utils/fetchServerSideData '
import { SentimentDissatisfied } from '@mui/icons-material';
import { Box, Grid2 } from "@mui/material";
import React from 'react'
import { ScratchCard } from "next-scratchcard";

const PlayPage = async () => {
  const res = await fetchServerSideData(routesObj["except-me"]);
  const allUsers = await res.result;

  const handleComplete = () => {
    console.log("Scratch card completed!");
  };

  return allUsers?.length > 0 ? (
    allUsers?.map((user: any) => (
      <Grid2 size={4}>
        {
          <ScratchCard
            finishPercent={30}
            brushSize={20}
            onComplete={handleComplete}
          >
            <img src="/scratch_foreground.png" />
          </ScratchCard>
        }
      </Grid2>
    ))
  ) : (
    <Box className="text-center my-5">
      <SentimentDissatisfied fontSize="large" />
      <p>No users added yet.</p>
    </Box>
  );
}

export default PlayPage