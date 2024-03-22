import "@/app/globals.css";
import "@/app/globalicons.css";

import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Jost } from "next/font/google";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app//components/Footer";
import RecaptchaProvider from "@/app/components/providers/recaptcha-provider";
import type { Metadata } from "next";
import { sharedMetadata } from "./metadata";
import ThemeProvider from "./components/providers/theme-provider";

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
    <html lang="en">
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
