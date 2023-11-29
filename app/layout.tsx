import "./globals.css";
import "./globalicons.css";
import { Jost } from "next/font/google";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// TODO: This should be moved into each component, and if possible populated by Contentful page title
export const metadata = {
  title: `GCD | Digital Strategy & Software Development`,
  description: `Digital Strategy & Software Development to Drive Your Business Success.`,
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
        <main className="flex min-h-screen flex-col justify-start py-10 m-0 text-black bg-neutral">
          <NavBar />
          <div>{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
