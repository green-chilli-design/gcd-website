import { getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import React from "react";
import type { Metadata } from "next";

const title = "GCD | Privacy Policy";
export const metadata: Metadata = {
  title,
  openGraph: {
    title,
  },
  twitter: {
    title,
  },
};

export default async function PrivacyPolicyPage() {
  const { pageContentCollection } = await getPageBySlug("privacy-policy");

  let contentBlocks = generateContentBlocks(pageContentCollection.items);

  return (
    <div className="main-content mb-20">
      <main>{contentBlocks}</main>
    </div>
  );
}
