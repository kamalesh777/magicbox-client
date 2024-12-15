"use client";

import { SentimentDissatisfied } from "@mui/icons-material";
import { Grid2, Box } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const ScratchCard = dynamic(() => import("react-scratchcard-v4"));

const PlayCard = ({ data }: any) => {
  return data?.length > 0 ? (
    <Grid2 container size={12}>
      {data?.map((user: any) => (
        <Grid2 size={3}>
          {
            <ScratchCard
              width={280}
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
                <h1>{user.name}</h1>
              </div>
            </ScratchCard>
          }
        </Grid2>
      ))}
    </Grid2>
  ) : (
    <Box className="text-center my-5">
      <SentimentDissatisfied fontSize="large" />
      <p>No users added yet.</p>
    </Box>
  );
};

export default PlayCard;
