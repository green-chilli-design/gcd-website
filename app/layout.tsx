import "@/app/globalicons.css";
import "@/app/globals.css";

import Footer from "@/app//components/Footer";
import NavBar from "@/app/components/NavBar";
import RecaptchaProvider from "@/app/components/providers/recaptcha-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { sharedMetadata } from "./metadata";

// temp fix for https://github.com/pacocoursey/next-themes/issues/169
// basically forces it to be client side, which is not ideal
// TODO: remove this once the issue is fixed or investigate a better solution
import dynamic from "next/dynamic";
const ThemeProvider = dynamic(
  () => import("@/app/components/providers/theme-provider"),
  {
    ssr: false,
  },
);
// end temp fix

export const metadata: Metadata = {
  ...sharedMetadata,
};

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={jost.className}>
        <ThemeProvider>
          <RecaptchaProvider>
            <main className="m-0 flex min-h-screen flex-col justify-start bg-neutral text-black dark:bg-black dark:text-neutral">
              <NavBar />
              <div className="flex-1">{children}</div>
              <Footer />
            </main>
            <Analytics />
          </RecaptchaProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-Z5E8C9JM8E" />
    </html>
  );
}
