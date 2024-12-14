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

export const metadata: Metadata = {
  title: BRAND_NAME || "Magicbox",
  description: "A gift sharing game between team colleauges",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider dynamic>
          <MainLayout>
            {children}
          </MainLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
