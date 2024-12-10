'use client'

import { updateUserDetails } from '@/store/slice/userSlice'
import { useAuth } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Logout = () => {
  const {signOut} = useAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateUserDetails({
      is_owner: false
    }));
    signOut()
    // router.replace(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string);
  }, [])
  return (
    <div>Please wait.....</div>
  )
}

export default Logout