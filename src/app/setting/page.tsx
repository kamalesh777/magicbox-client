'use client'

import SettingComp from '@/modules/setting'
import { RootState } from '@/store/index'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const SettingPage = () => {
  const userState = useSelector((state: RootState) => state?.user?.details)

  useEffect(() => {
    if (!userState?.is_owner) {
      // redirect('/not-found')
    }

  }, [userState])

  return (
    <SettingComp />
  )
}

export default SettingPage