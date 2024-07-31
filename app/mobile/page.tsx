import { ContentBlock, getAllClients, getPageBySlug } from "@/lib/api";
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
import ClientGallery from "../components/ClientGallery";
import OurClients from "../components/contentful-content-blocks/OurClients";
import Timeline from "../components/Timeline";
import { Markdown } from "@/lib/markdown";

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
  const clients = await getAllClients();

  const reviewCardContentBlocks = generateContentBlocks(
    mobilePage.pageContentCollection.items.filter(
      (item: any) => item.__typename === "AppReviewCard",
    ),
  );

  const shakingUpTheQAProcessContentBlock = generateContentBlocks(
    mobilePage.pageContentCollection.items.filter(
      (item: any) =>
        item.__typename === "ContentBlockWithImage" &&
        item.heading === "Shaking Up the QA Process",
    ),
  );

  const transformingBusinessContentBlock = generateContentBlocks(
    mobilePage.pageContentCollection.items.filter(
      (item: any) =>
        item.__typename === "ContentBlock" &&
        item.heading === "Transforming Business Ideas into Reality",
    ),
  );

  const collaborativeApproachSection = generateContentBlocks(
    mobilePage.pageContentCollection.items.filter(
      (item: any) =>
        item.__typename === "ContentBlock" &&
        item.heading === "Our Collaborative Approach to Mobile App Development",
    ),
  );

  const faqSection = generateContentBlocks(
    mobilePage.pageContentCollection.items.filter(
      (item: any) => item.heading === "FAQ's",
    ),
  );

  const caseStudies = mobilePage.pageContentCollection.items
    .map(
      (item: any) => item.caseStudy, // NOW filter any undefined/null values
    )
    .filter((item: any) => !!item);

  return (
    <article className="relative mt-10 grid grid-cols-[repeat(4,1fr)] gap-5 md:mt-20 md:grid-cols-[repeat(12,1fr)]">
      {/* Header (contains title only) */}
      <header className="main-content col-span-full grid grid-cols-subgrid">
        <h1 className="col-span-full text-5xl md:col-span-9 md:text-10xl">
          Crafting Exceptional Mobile Experiences with React Native.
        </h1>
      </header>
      {/* Subtitle + CTA Section */}
      <section className="main-content col-span-full my-10 grid grid-cols-subgrid items-center">
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
        className="col-span-full mx-10 mb-20 grid grid-cols-subgrid"
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
        className="main-content col-span-full grid grid-cols-subgrid"
      >
        {reviewCardContentBlocks}
      </section>
      {/* Transforming business section */}
      <section className="col-span-full mt-20 grid grid-cols-subgrid  md:pt-20">
        {transformingBusinessContentBlock}
      </section>
      {/* Collab approach/logos section */}
      <section className="col-span-full grid grid-cols-subgrid ">
        <div className="col-span-full flex w-full flex-col">
          <div className="self-start">{collaborativeApproachSection}</div>
        </div>
        <CollaborativeBenefits />
      </section>
      <div className="col-span-full mt-20">
        <ClientGallery
          clients={clients}
          className={"main-content justify-between"}
        />
      </div>
      <section
        id="timeline"
        className="col-span-full  w-full  bg-dark-offwhite py-20  dark:bg-black-80"
      >
        <Timeline />
      </section>
      {/* Shaking up the QA Process section */}
      <section
        id="shaking-up-qa-section"
        className="col-span-full grid grid-cols-subgrid"
      >
        <div className="col-span-full flex w-full flex-col">
          {shakingUpTheQAProcessContentBlock}
        </div>
      </section>
      {/* Case Study Section: These cards are generated from the case studies linked above in the review cards */}
      <section
        id="case-studies"
        className="main-content col-span-full my-20 mb-24 grid grid-cols-subgrid"
      >
        <div
          id="case-study-header"
          className="col-span-full grid grid-cols-subgrid"
        >
          <h2 className="col-span-full mb-10 text-center">
            Case Studies of GCD Clients
          </h2>
        </div>
        {caseStudies.map((caseStudy: any) => (
          <div
            className="
              col-span-full
              md:col-span-6
              lg:col-span-4
            "
            key={caseStudy.slug}
          >
            <CaseStudyPreview
              key={caseStudy.slug}
              title={caseStudy.title}
              coverImage={caseStudy.coverImage}
              slug={caseStudy.slug}
              summary={caseStudy.summary}
            />
          </div>
        ))}
      </section>
      {/* React Native Advantages Section */}
      <section
        id="react-native-advantages"
        className="col-span-full mt-20 flex w-full flex-col"
      >
        <ReactNative bannerHidden />
      </section>
      {/* FAQs section */}
      <section className="col-span-full grid grid-cols-subgrid" id="faqs">
        <div className="col-span-full">{faqSection}</div>
      </section>
      {/* Call to Action section */}
      <section
        id="call-to-action"
        className="col-span-full mb-20 flex flex-col items-center"
      >
        <CallToActionBlock mobileVariant />
      </section>
    </article>
  );
}

// TODO: This should be migrated to Contentful and support for 3 column layout added
function CollaborativeBenefits() {
  return (
    <div className="main-content col-span-full grid w-full grid-cols-subgrid gap-10 md:mb-20">
      {/* 3 Columns */}
      <div className="col-span-full md:col-span-4">
        <h4 className="mb-2 uppercase">Increased Confidence</h4>
        <p>
          You'll have peace of mind knowing that your app is being developed
          with a deep understanding of your vision and a commitment to user
          satisfaction.
        </p>
      </div>
      <div className="col-span-full md:col-span-4">
        <h4 className="mb-2 uppercase">Higher Quality Product</h4>
        <p>
          By incorporating user feedback and addressing issues early, we deliver
          a polished, user-friendly app that exceeds expectations.
        </p>
      </div>
      <div className="col-span-full md:col-span-4">
        <h4 className="mb-2 uppercase">Cost and Time Savings</h4>
        <p>
          Our collaborative approach minimises the risk of costly rework,
          ensuring your project stays on track and within budget.
        </p>
      </div>
    </div>
  );
}
