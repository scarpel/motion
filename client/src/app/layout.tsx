import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@components/Providers";
import TabController from "@components/TabController/TabController";
import MainBlurAnimation from "@components/MainBlurAnimation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Motion",
  description: "Watch all your favorite videos in one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Render
  return (
    <html lang="en">
      <body
        className={poppins.className}
        style={{ overscrollBehaviorY: "none" }}
      >
        <Providers>
          <div className="relative min-w-full min-h-screen bg-background flex items-center justify-center">
            {children}

            <TabController className="z-50" />

            <MainBlurAnimation />
          </div>
        </Providers>
      </body>
    </html>
  );
}
