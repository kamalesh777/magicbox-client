'use client'

import React from 'react'
import AccountComp from '@/modules/account';
import { RootState } from '@/store/index';
import { useSelector } from 'react-redux';
import PageLoader from '@/components/common/PageLoader';

const AccountPage = () => {
    return <AccountComp />;
}

export default AccountPage