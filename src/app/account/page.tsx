import React from 'react'
import routesObj from '@/constants/ApiConstant';
import AccountComp from '@/modules/account';
import { fetchServerSideData } from '@/utils/fetchServerSideData ';

const AccountPage = async () => {

  // const data = await fetchServerSideData(routesObj["view-user"]);

  // console.log("=====data", data);
  return (
    <AccountComp />
  );
}

export default AccountPage