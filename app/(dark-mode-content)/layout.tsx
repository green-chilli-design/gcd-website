import "@/app/globals.css";
import dynamic from "next/dynamic";
const Providers = dynamic(() => import("../providers"), { ssr: false });
import { Jost } from "next/font/google";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: `GCD | Digital Strategy & Software Development`,
  description: `Digital Strategy & Software Development to Drive Your Business Success.`,
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
        <Providers>
          <main className="flex min-h-screen flex-col justify-start m-0 text-black bg-neutral">
            <NavBar />
            <div className="flex-1">{children}</div>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
