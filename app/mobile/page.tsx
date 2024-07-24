import { getPageBySlug } from "@/lib/api";
import { Metadata } from "next";
import { draftMode } from "next/headers";

const title = "GCD | Mobile";
export const metadata: Metadata = {
  title,
  openGraph: {
    title,
  },
  twitter: {
    title,
  },
};

export default async function MobilePage() {
  const { isEnabled } = draftMode();
  const mobilePage = await getPageBySlug("mobile", isEnabled);

  return (
    <div className="text-4xl">
      Crafting Exceptional Mobile Experiences with React Native.
      <div className="mt-5">
        <div className="text-2xl">Contentful:</div>
        <code className="text-xs">{JSON.stringify(mobilePage)}</code>
      </div>
    </div>
  );
}
