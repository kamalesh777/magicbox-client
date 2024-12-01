import React from "react";
import { Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ButtonWrapper from "@/components/wrapper/ButtonWrapper";
import Link from "next/link";

const SuccessBoxComp = () => {
  return (
    <div className="text-center p-3">
      <CheckCircleOutlineIcon
        sx={{ color: "success.main", fontSize: "70px" }}
      />
      <Box component="h2" sx={{ color: "success.main" }}>
        Successfully Created!
      </Box>
      <p className="mt-2">
        To get started, please check your email for further details and take the
        necessary actions to set up and personalize your workspace.
      </p>
      <Link legacyBehavior={true} href={"/account"}>
        <ButtonWrapper className="mt-3">Update address</ButtonWrapper>
      </Link>
    </div>
  );
};

export default SuccessBoxComp;
