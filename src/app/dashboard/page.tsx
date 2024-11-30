import API from "@/api/preference/API";
import routesObj from "@/constants/ApiConstant";
import DashboardComp from "@/modules/dashboard/DashboardComp";
import { fetchServerSideData } from "@/utils/fetchServerSideData ";
import { auth } from "@clerk/nextjs/server";
import { headers } from "next/headers";

const Dashboard = async () => {
  const data = await fetchServerSideData(routesObj['view-workspace']);
  return <DashboardComp />
};

export default Dashboard
