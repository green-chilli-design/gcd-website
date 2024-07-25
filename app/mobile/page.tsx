import { getPageBySlug } from "@/lib/api";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";

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
  const bannerImages: [] = mobilePage.bannerContent?.imagesCollection?.items;

  return (
    <>
      <article className="main-content grid grid-cols-4 md:grid-cols-12 ">
        {/* Header (contains title only) */}
        <header className="grid-cols-subgrid col-span-12 grid">
          <h1 className="col-span-4 bg-yellow-800 md:col-span-9">
            Crafting Exceptional Mobile Experiences with React Native.
          </h1>
        </header>
        {/* Subtitle + CTA Section */}
        <section className="grid-cols-subgrid col-span-12 my-20 grid items-center">
          <div className="col-span-4 bg-pink-800 md:col-span-6">
            {mobilePage.subtitle}
          </div>
          <div id="tell-us-cta" className="col-span-6 ml-auto ">
            <Link
              href={"/contact"}
              className="btn dark:light dark flex  h-fit w-fit flex-col flex-nowrap whitespace-nowrap px-5  py-1 text-neutral dark:text-black"
            >
              Tell Us About Your App
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
