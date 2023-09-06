import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export const metadata = {
  title: `GCD | Digital Strategy & Software Development`,
  description: `Digital Strategy & Software Development to Drive Your Business Success.`,
};

const inter = Inter({
  variable: "--font-inter",
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
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-start px-20 py-10  m-0 text-white bg-slate-950">
          <NavBar />
          <div>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
