import type { Metadata } from "next";
// import "../styles/reset.scss";
import "../styles/global.scss";
import "../styles/bs-utility.scss";
import { ClerkProvider } from "@clerk/nextjs";

import MainLayout from "@/components/common/MainLayout";
import { PropsWithChildren } from "react";
import routesObj from "@/constants/ApiConstant";
import { fetchServerSideData } from "@/utils/fetchServerSideData ";
import { headers } from "next/headers";
import { permanentRedirect, redirect } from "next/navigation";
import { BRAND_NAME } from "@/constants/AppConstant";
import RedirectHandler from "@/components/common/RedirectHandler";

export const metadata: Metadata = {
  title: BRAND_NAME || "Magicbox",
  description: "A gift sharing game between team colleauges",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  let result; // Declare result variable to store user data

  const headersList = headers(); // Fetch headers
  const host = headersList.get("host"); // Get host from headers
  
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
  return (
    <html lang="en">
      <body>
        <ClerkProvider dynamic>
          <MainLayout userData={result}>
            {(!!result && result?.workspace_url !== host) ? <RedirectHandler {...{...result}} /> : children}
          </MainLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
