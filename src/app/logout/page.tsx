'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Logout = () => {
  const {signOut} = useAuth()
  const router = useRouter()

  useEffect(() => {
    signOut()
    // router.replace(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string);
  }, [])
  return (
    <div>Please wait.....</div>
  )
}

export default Logout