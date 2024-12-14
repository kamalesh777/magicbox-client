'use client'

import PageLoader from '@/components/common/PageLoader'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const RootPage = () => {
  const isUserStateLoading = useSelector(
    (state: RootState) => state.user.loading
  );

  return (
    isUserStateLoading ? <PageLoader /> : null
  )
}

export default RootPage