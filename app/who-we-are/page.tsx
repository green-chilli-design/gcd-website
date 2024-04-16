import type { Metadata } from "next";

const title = "GCD | Who We Are";
export const metadata: Metadata = {
  title,
  openGraph: {
    title,
  },
  twitter: {
    title,
  },
};

export default function WhoWeArePage() {
  return (
    <div>
      <section className="main-content my-32">
        <h1>Who We Are</h1>
      </section>
    </div>
  );
}
