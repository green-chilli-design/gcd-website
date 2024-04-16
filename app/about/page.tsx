import type { Metadata } from "next";
import React from "react";

const title = "GCD | About";
export const metadata: Metadata = {
  title,
  openGraph: {
    title,
  },
  twitter: {
    title,
  },
};

export default async function AboutPage() {
  return <div>About</div>;
}
