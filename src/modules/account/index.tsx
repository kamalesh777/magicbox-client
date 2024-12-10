"use client";

import React from "react";
import { Grid2, Card, CardContent } from "@mui/material";
import PageLoader from "@/components/common/PageLoader";
import { usePathname } from "next/navigation";
import AccountForm from "./AccountForm";
import AccountDetails from "./AccountDetails";
import { RootState } from "@/store/index";
import { useSelector } from "react-redux";

const AccountComp = () => {
  const pathname = usePathname();

  const userStateLoading = useSelector(
    (state: RootState) => state?.user?.loading
  );

  const isUpdateForm = pathname === "/account/update";
  console.log("===userStateLoading", userStateLoading);
  return userStateLoading ? (
    <PageLoader />
  ) : (
    <div className="company-form">
      <Grid2 container justifyContent="center">
        <Grid2 size={{ md: 6, sm: 12 }}>
          <Card>
            <CardContent>
              {isUpdateForm ? <AccountForm /> : <AccountDetails />}
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default AccountComp;
