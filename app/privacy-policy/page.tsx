import { getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import React from "react";

export default async function PrivacyPolicyPage() {
  const { pageContentCollection } = await getPageBySlug("privacy-policy");

  let contentBlocks = generateContentBlocks(pageContentCollection.items);

  return (
    <div className="container mb-20">
      <main>{contentBlocks}</main>
    </div>
  );
}
