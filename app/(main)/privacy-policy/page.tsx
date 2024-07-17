import { getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import type { Metadata } from "next";
import { draftMode } from "next/headers";

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
  const { isEnabled } = draftMode();
  const { pageContentCollection } = await getPageBySlug(
    "privacy-policy",
    isEnabled,
  );

  let contentBlocks = generateContentBlocks(pageContentCollection.items);

  return (
    <div className="main-content mb-20">
      <main>{contentBlocks}</main>
    </div>
  );
}
