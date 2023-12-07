import "./globals.css";
import "./globalicons.css";
import { Jost } from "next/font/google";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Providers } from "./providers";

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
