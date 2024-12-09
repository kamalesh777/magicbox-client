import routesObj from '@/constants/ApiConstant'
import { fetchServerSideData } from '@/utils/fetchServerSideData '
import React from 'react'

const PlayPage = async () => {
  const allUsers = await fetchServerSideData(routesObj["except-me"]);
  return <div>{JSON.stringify(allUsers)}</div>;
}

export default PlayPage