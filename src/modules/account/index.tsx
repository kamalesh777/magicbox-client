"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { Grid2, Card, CardContent } from "@mui/material";
import PageLoader from "@/components/common/PageLoader";
import { usePathname } from "next/navigation";
import AccountForm from "./AccountForm";
import AccountDetails from "./AccountDetails";



const AccountComp = () => {
  const pathname = usePathname()
  const { isLoaded } = useUser();

  const isUpdateForm = pathname === "/account/update";

  return !isLoaded ? (
    <PageLoader />
  ) : (
    <div className="company-form">
      {/* <Container> */}
      <Grid2 container justifyContent="center">
        <Grid2 size={6}>
          <Card>
            <CardContent>
              {isUpdateForm ? <AccountForm /> : <AccountDetails />}
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
      {/* </Container> */}
    </div>
  );
};

export default AccountComp;
