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
import { redirect } from "next/navigation";
import { BRAND_NAME } from "@/constants/AppConstant";

export const metadata: Metadata = {
  title: BRAND_NAME || "Magicbox",
  description: "A gift sharing game between team colleauges",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  let result; // Declare result variable to store user data

  try {
    const headersList = headers(); // Fetch headers
    const host = headersList.get("host"); // Get host from headers

    // Fetch server-side data
    const res = await fetchServerSideData(routesObj["view-user"]);

    // Check if the response was successful
    if (res.success) {
      result = res.result;

      // Redirect if workspace_url does not match the host
      if (result?.workspace_url !== host) {
        console.log("====code work")
        const redirectUrl = `https://${result.workspace_url}`;
        redirect(redirectUrl);
      }

      // Redirect if the user is not the owner
      if (result?.is_owner === false) {
        redirect("/account");
      }
    }
  } catch (error) {
    console.error("Error in RootLayout:", error);
    // Handle errors gracefully or redirect to an error page if needed
  }
  return (
    <html lang="en">
      <body>
        <ClerkProvider dynamic>
          <MainLayout userData={result}>{children}</MainLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
