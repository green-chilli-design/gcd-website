import React from "react";

const title = "GCD | Who We Are";
export const metadata = {
  title,
  openGraph: {
    title,
  },
  twitter: {
    title,
  },
};

export default async function WhoWeArePage() {
  return (
    <div>
      <section className="main-content my-32">
        <h1>Who We Are</h1>
      </section>
    </div>
  );
}
