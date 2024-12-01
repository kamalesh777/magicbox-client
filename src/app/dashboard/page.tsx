import routesObj from "@/constants/ApiConstant";
import DashboardComp from "@/modules/dashboard/DashboardComp";
import SuccessBox from "@/modules/dashboard/SuccessBox";
import { fetchServerSideData } from "@/utils/fetchServerSideData ";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const data = await fetchServerSideData(routesObj['view-workspace']);

  if (data?.success && data?.result !== null) {
    redirect('/account')
  }
  return <SuccessBox />
};

export default Dashboard
