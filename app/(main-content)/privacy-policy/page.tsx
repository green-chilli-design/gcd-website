import { getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import React from "react";

export default async function PrivacyPolicyPage() {
  const { pageContentCollection } = await getPageBySlug("privacy-policy");

  let contentBlocks = generateContentBlocks(pageContentCollection.items);

  return (
    <div className="md:container md:mx-auto mx-[18px] mb-20">
      <main>{contentBlocks}</main>
    </div>
  );
}
