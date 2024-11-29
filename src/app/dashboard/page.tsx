import { getRequest } from "@/api/preference/RequestService";
import DashboardComp from "@/modules/dashboard/DashboardComp";

const Dashboard = async () => {
  const data = await getRequest('/api/view-workspace')
  console.log("===data", data);
  return <DashboardComp />
};

export default Dashboard
