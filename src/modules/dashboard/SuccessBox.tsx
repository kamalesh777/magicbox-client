import React from "react";
import { Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ButtonWrapper from "@/components/wrapper/ButtonWrapper";
import Link from "next/link";
import { submitResponseType } from "./DashboardComp";

interface Proptypes {
  data: submitResponseType;
}

const SuccessBoxComp = ({data}: Proptypes ) => {
  return (
    <div className="text-center p-3">
      <CheckCircleOutlineIcon
        sx={{ color: "success.main", fontSize: "70px" }}
      />
      <Box component="h2" sx={{ color: "success.main" }}>
        Successfully Created!
      </Box>
      <p className="mt-2">
        Your domain is ready, click the below button to visit your domain.
      </p>
      <Link
        legacyBehavior={true}
        href={`https://${data?.workspace_url}`}
        target="new"
      >
        <ButtonWrapper className="mt-3">Redirect Now!</ButtonWrapper>
      </Link>
    </div>
  );
};

export default SuccessBoxComp;
