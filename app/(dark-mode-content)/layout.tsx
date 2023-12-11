import "@/app/globals.css";
import "@/app/globalicons.css";

import { Jost } from "next/font/google";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

import Providers from "../providers";
import dynamic from "next/dynamic";
const ProvidersTheme = dynamic(() => import("../providers-theme"), {
  ssr: false,
});

import { Metadata } from "next";
import { sharedMetadata } from "../metadata";

export const metadata: Metadata = {
  ...sharedMetadata,
};

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jost.className}>
        <ProvidersTheme>
          <Providers>
            <main className="m-0 flex min-h-screen flex-col justify-start bg-neutral text-black dark:bg-black dark:text-neutral">
              <NavBar />
              <div className="flex-1">{children}</div>
              <Footer />
            </main>
          </Providers>
        </ProvidersTheme>
      </body>
    </html>
  );
}