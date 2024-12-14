import type { Metadata } from "next";
// import "../styles/reset.scss";
import "../styles/global.scss";
import "../styles/bs-utility.scss";
import { ClerkProvider } from "@clerk/nextjs";

import MainLayout from "@/components/common/MainLayout";
import { PropsWithChildren } from "react";
import routesObj from "@/constants/ApiConstant";
import { fetchServerSideData } from "@/utils/fetchServerSideData ";
import { BRAND_NAME } from "@/constants/AppConstant";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: BRAND_NAME || "Magicbox",
  description: "A gift sharing game between team colleauges",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const { userId } = await auth();

  let result; // Declare result variable to store user data
  
  if (userId) {
    try {
      // Fetch server-side data
      const res = await fetchServerSideData(routesObj["view-user"]);
      // Check if the response was successful
      if (res.success) {
        result = res.result;
      }
    } catch (error) {
      console.error("Error in RootLayout:", error);
      // Handle errors gracefully or redirect to an error page if needed
    }
  }
    
  return (
    <html lang="en">
      <body>
        <ClerkProvider dynamic>
          <MainLayout userData={result}>
            {children}
          </MainLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
