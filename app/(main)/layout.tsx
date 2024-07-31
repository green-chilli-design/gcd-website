import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/NavBar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
}
