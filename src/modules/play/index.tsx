"use client";

import { UserSliceTypes } from "@/store/slice/userSlice";
import { SentimentDissatisfied } from "@mui/icons-material";
import { Grid2, Box, Container, Paper } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const ScratchCard = dynamic(() => import("react-scratchcard-v4"));

const PlayCard = ({ data }: any) => {
  const [showUser, setShowUser] = useState(false);

  const completeHandler = (userObj: UserSliceTypes['details']) => {
    console.log("===userObj", userObj);
    setShowUser(true);
  };

  return data?.length > 0 ? (
    <div className="company-form">
      <Container disableGutters>
        <Grid2 container justifyContent="center">
          {data?.map((user: any) => (
            <Grid2 size={3}>
              {
                <ScratchCard
                  width={280}
                  height={226}
                  image={"/scratch_foreground.png"}
                  finishPercent={60}
                  onComplete={() => completeHandler(user)}
                >
                  <Paper
                    sx={{
                      display: "flex",
                      width: "100%",
                      height: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "secondary.light",
                    }}
                  >
                    {showUser && (
                      <>
                        <h1>{user.name}</h1>
                      </>
                    )}
                  </Paper>
                </ScratchCard>
              }
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </div>
  ) : (
    <Box className="text-center my-5">
      <SentimentDissatisfied fontSize="large" />
      <p>No users added yet.</p>
    </Box>
  );
};

export default PlayCard;
