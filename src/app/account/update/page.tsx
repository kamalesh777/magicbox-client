'use client'

import React, { useLayoutEffect } from "react";
import AccountComp from "@/modules/account";
import { RootState } from "@/store/index";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const AccountUpdatePage = async () => {
  const userState = useSelector((state: RootState) => state?.user?.details)

  useLayoutEffect(() => {
    if (userState.email && !userState?.is_owner) {
      redirect('/not-found')
    }

  }, [userState])
  return <AccountComp />;
};

export default AccountUpdatePage;
