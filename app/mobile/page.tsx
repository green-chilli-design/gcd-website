import { getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import ContentfulMedia from "@/lib/contentful-media";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import ReactNative from "../components/ReactNative";
import CallToActionBlock from "../components/contentful-content-blocks/CallToActionBlock";
import AllCaseStudies, {
  CaseStudyPreview,
} from "../case-studies/all-case-studies";

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

  let contentBlocks = generateContentBlocks(
    mobilePage.pageContentCollection.items,
  );

  const caseStudies = mobilePage.pageContentCollection.items
    .map(
      (item: any) => item.caseStudy, // NOW filter any undefined/null values
    )
    .filter((item: any) => !!item);

  console.log(caseStudies);

  return (
    <article className="main-content mt-10 grid grid-cols-[repeat(4,1fr)] gap-5 md:mt-20 md:grid-cols-[repeat(12,1fr)]">
      {/* <pre className="text-sm">
        {JSON.stringify(mobilePage.pageContentCollection, null, 2)}
      </pre> */}
      {/* Header (contains title only) */}
      <header className="col-span-full grid grid-cols-subgrid">
        <h1 className="col-span-full text-5xl md:col-span-9 md:text-10xl">
          Crafting Exceptional Mobile Experiences with React Native.
        </h1>
      </header>
      {/* Subtitle + CTA Section */}
      <section className="col-span-full my-10 grid grid-cols-subgrid items-center">
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
      {/* Banner Image Section (3 on desktop, 1 on mob) */}
      <section
        id="banner-images"
        className="col-span-full mb-20 grid grid-cols-subgrid"
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
      {/* App review  cards */}
      <section
        id="app-review-cards"
        className="col-span-full grid grid-cols-subgrid"
      >
        {contentBlocks}
      </section>
      <section
        id="case-studies"
        className="main-content col-span-full my-20 mb-24 grid grid-cols-1 gap-20 md:grid-cols-2 xl:grid-cols-3"
      >
        <div id="case-study-header" className="col-span-full text-center">
          <h2>Case Studies of GCD Clients</h2>
        </div>
        {caseStudies.map((caseStudy: any) => (
          <CaseStudyPreview
            key={caseStudy.slug}
            title={caseStudy.title}
            coverImage={caseStudy.coverImage}
            slug={caseStudy.slug}
            summary={caseStudy.summary}
          />
        ))}
      </section>
      <section
        id="react-native-advantages"
        className="col-span-full  flex flex-col items-center"
      >
        <ReactNative bannerHidden />
      </section>
      <section
        id="call-to-action"
        className="col-span-full mb-20 flex flex-col items-center"
      >
        <CallToActionBlock mobileVariant />
      </section>
    </article>
  );
}
