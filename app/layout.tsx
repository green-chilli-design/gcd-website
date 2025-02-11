import "@/app/globalicons.css";
import "@/app/globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { sharedMetadata } from "./metadata";
import { GoogleTagManager } from "@next/third-parties/google";

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
          <main className="m-0 flex min-h-screen flex-col justify-start bg-neutral text-black dark:bg-black dark:text-neutral">
            {children}
          </main>
          <Analytics />
        </ThemeProvider>
      </body>
      <GoogleTagManager gtmId="GTM-5TVL55S" />
    </html>
  );
}
