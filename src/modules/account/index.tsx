"use client";

import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Grid2, Card, CardContent } from "@mui/material";
import PageLoader from "@/components/common/PageLoader";
import { usePathname } from "next/navigation";
import AccountForm from "./AccountForm";
import AccountDetails from "./AccountDetails";
import { useGetRequestHandler } from "@/hooks/requestHandler";



const AccountComp = () => {
  const pathname = usePathname()

  const { isLoading, data, fetchData } = useGetRequestHandler();

  useEffect(() => {
    fetchData("/api/view-user");
  }, []);

  const isUpdateForm = pathname === "/account/update";

  return isLoading ? (
    <PageLoader />
  ) : (
    <div className="company-form">
      {/* <Container> */}
      <Grid2 container justifyContent="center">
        <Grid2 size={6}>
          <Card>
            <CardContent>
              {isUpdateForm ? (
                <AccountForm {...{ data }} />
              ) : (
                <AccountDetails {...{ data }} />
              )}
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
      {/* </Container> */}
    </div>
  );
};

export default AccountComp;
