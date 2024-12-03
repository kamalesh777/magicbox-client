import type { Metadata } from "next";
// import "../styles/reset.scss";
import "../styles/global.scss";
import "../styles/bs-utility.scss";
import {
  ClerkProvider,
} from "@clerk/nextjs";

import MainLayout from "@/components/common/MainLayout";
import { fetchServerSideData } from "@/utils/fetchServerSideData ";
import routesObj from "@/constants/ApiConstant";

export const metadata: Metadata = {
  title: "Magicbox",
  description: "A gift sharing game between team colleauges",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const data = await fetchServerSideData(routesObj["view-user"]);
  console.log("===user data", data)

  return (
    <html lang="en">
      <body>
        <ClerkProvider dynamic>
          <MainLayout {...{ userData: data?.result }}>{children}</MainLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
