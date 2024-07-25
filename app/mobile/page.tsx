import { getPageBySlug } from "@/lib/api";
import ContentfulMedia from "@/lib/contentful-media";
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
      <article className="main-content grid grid-cols-[repeat(4,1fr)] gap-5 md:grid-cols-[repeat(12,1fr)]">
        {/* Header (contains title only) */}
        <header className="grid-cols-subgrid col-span-full grid">
          <h1 className="col-span-full md:col-span-9">
            Crafting Exceptional Mobile Experiences with React Native.
          </h1>
        </header>
        {/* Subtitle + CTA Section */}
        <section className="grid-cols-subgrid col-span-full my-10 grid items-center">
          <h3 className="col-span-full md:col-span-6">{mobilePage.subtitle}</h3>
          <div
            id="tell-us-cta"
            className="col-span-full  my-5 md:col-span-6 md:my-0 md:ml-auto"
          >
            <Link
              href={"/contact"}
              className="btn dark:light dark flex  h-fit w-fit flex-col flex-nowrap whitespace-nowrap px-5  py-1 text-neutral dark:text-black"
            >
              Tell Us About Your App
            </Link>
          </div>
        </section>
        <section
          id="banner-images"
          className="grid-cols-subgrid col-span-full mb-20 grid"
        >
          {bannerImages.map((image: any, index) => (
            <ContentfulMedia
              key={image.url}
              src={image.url}
              alt={image.title}
              imageProps={{
                priority: true,
                className: `col-span-full md:col-span-4 -rounded-br-[30px] rounded-tl-[30px] object-cover min-h-full ${
                  index !== 0 && "hidden md:block"
                }`,
                width: image.width,
                height: image.height,
              }}
            />
          ))}
        </section>
      </article>
    </>
  );
}
