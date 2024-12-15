import routesObj from '@/constants/ApiConstant'
import { fetchServerSideData } from '@/utils/fetchServerSideData '
import { SentimentDissatisfied } from '@mui/icons-material';
import { Box, Grid2 } from "@mui/material";
import React from 'react'
import ScratchCard from "react-scratchcard-v4";

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
            width={320}
            height={226}
            image={"/scratch_foreground.png"}
            finishPercent={80}
            onComplete={() => console.log("===complete", user)}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1>Scratch card</h1>
            </div>
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