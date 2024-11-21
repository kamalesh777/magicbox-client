import type { Metadata } from "next";
// import "../styles/reset.scss";
import "../styles/global.scss";
import "../styles/bs-utility.scss";
import {
  ClerkProvider,
} from "@clerk/nextjs";

import MainLayout from "@/components/common/MainLayout";

export const metadata: Metadata = {
  title: "Magicbox",
  description: "A gift sharing game between team colleauges",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider dynamic>
          <MainLayout>{children}</MainLayout>
        </ClerkProvider>
      </body>
    </html>
  );
}
