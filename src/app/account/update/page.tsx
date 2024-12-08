'use client'

import React, { useEffect } from "react";
import AccountComp from "@/modules/account";
import { RootState } from "@/store/index";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const AccountUpdatePage = async () => {
  const userState = useSelector((state: RootState) => state?.user?.details);
  const userStateLoading = useSelector(
    (state: RootState) => state?.user?.loading
  );

  console.log("===userState", userState);

  useEffect(() => {
    if (!userStateLoading && !userState?.is_owner) {
      redirect("/not-found");
    }
  }, [userStateLoading]);
  return <AccountComp />;
};

export default AccountUpdatePage;
