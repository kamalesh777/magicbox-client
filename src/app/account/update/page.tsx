'use client'

import React, { useEffect } from "react";
import AccountComp from "@/modules/account";
import { RootState } from "@/store/index";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const AccountUpdatePage = async () => {
  const router = useRouter();
  const userState = useSelector((state: RootState) => state?.user?.details);
  const userStateLoading = useSelector(
    (state: RootState) => state?.user?.loading
  );

  useEffect(() => {
    if (!userStateLoading && !userState?.is_owner) {
      router.push("/not-found");
    }
  }, [userStateLoading, userState, router]);
  
  return <AccountComp />;
};

export default AccountUpdatePage;
