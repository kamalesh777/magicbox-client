"use client";

import { SentimentDissatisfied } from "@mui/icons-material";
import { Grid2, Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const ScratchCard = dynamic(() => import("react-scratchcard-v4"));

const PlayCard = ({ data }: any) => {
    console.log("====data", data);
  return data?.length > 0 ? (
    data?.map((user: any) => (
      <Grid2 size={4}>
        {
          <ScratchCard
            width={320}
            height={226}
            image={"/scratch_foreground.png"}
            finishPercent={85}
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
};

export default PlayCard;
