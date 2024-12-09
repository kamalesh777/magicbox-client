'use client'

import React from "react";
import AccountComp from "@/modules/account";
import { RootState } from "@/store/index";
import { useSelector } from "react-redux";
import PageLoader from "@/components/common/PageLoader";

const AccountUpdatePage = () => {
  const userStateLoading = useSelector(
    (state: RootState) => state?.user?.loading
  );


  return userStateLoading ? <PageLoader /> : <AccountComp />;
};

export default AccountUpdatePage;
