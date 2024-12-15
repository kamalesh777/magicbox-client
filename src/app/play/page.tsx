import routesObj from '@/constants/ApiConstant'
import { fetchServerSideData } from '@/utils/fetchServerSideData '
import { auth } from '@clerk/nextjs/server';
import { SentimentDissatisfied } from '@mui/icons-material';
import { Box, Grid2 } from "@mui/material";
import dynamic from 'next/dynamic';
import React from 'react'


const ScratchCard = dynamic(() => import("react-scratchcard-v4"));



const PlayPage = async () => {
  const { userId } = await auth();

  let data;

  if (userId) {
    try {
      const res = await fetchServerSideData(routesObj["except-me"]);

      if (res?.success) {
        data = res?.result;
      } else {
        data = []
      }
    } catch (err) {
      console.log("=====error in play page", err)
    }
  }

  return data?.length > 0 ? (
    data?.map((user: any) => (
      <Grid2 size={4}>
        {
          <ScratchCard
            width={320}
            height={226}
            image={
              "/scratch_foreground.png"
            }
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
        {user.name}
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