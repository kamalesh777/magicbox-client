'use client'

import React, { useLayoutEffect } from 'react'
import AccountComp from '@/modules/account';
import { RootState } from '@/store/index';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';

const AccountPage = async () => {

  const userState = useSelector((state: RootState) => state?.user?.details)

  console.log("===userState", userState)

  useLayoutEffect(() => {
    if (userState.email && !userState?.is_owner) {
      redirect("/not-found");
    }
  }, [userState]);
  
  return (
    <AccountComp />
  );
}

export default AccountPage