import { ContentBlock, getAllClients, getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import ContentfulMedia from "@/lib/contentful-media";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import ReactNative from "../../components/ReactNative";
import CallToActionBlock from "../../components/contentful-content-blocks/CallToActionBlock";
import ClientGallery from "../../components/ClientGallery";
import OurClients from "../../components/contentful-content-blocks/OurClients";
import Timeline from "../../components/Timeline";
import { Markdown } from "@/lib/markdown";
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
  const clients = await getAllClients();

  // Generate content blocks to be used in the page
  // TODO: Suggest we refactor to directly use <ContentBlock> components with cn()
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
    .map((item: any) => item.caseStudy)
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
          className="col-span-full my-5 md:col-span-6 md:my-0 md:ml-auto"
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
        className="relative col-span-full flex flex-row gap-5 overflow-x-scroll px-[18px] md:mb-20 md:overflow-x-clip md:px-0 md:pl-[80px] lg:pl-[5rem] xl:px-[10%]"
      >
        {bannerImages.map((image: any, index) => (
          <div
            key={image.url}
            className="relative h-[50vh] max-h-[500px] min-w-[80vw] md:max-h-[1200px] md:w-1/3 md:min-w-fit"
          >
            <ContentfulMedia
              key={image.url}
              src={image.url}
              alt={image.title}
              imageProps={{
                priority: true,
                className:
                  "object-cover rounded-br-[30px] rounded-tl-[30px] h-[50vh]",
                fill: true,
              }}
            />
          </div>
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
      <section className="col-span-full grid grid-cols-subgrid  md:pt-20">
        {transformingBusinessContentBlock}
      </section>
      {/* Collab approach/logos section */}
      <section className="main-content my:py-10 col-span-full grid grid-cols-subgrid py-20">
        {collaborativeApproachSection}
      </section>
      <div className="col-span-full grid grid-cols-subgrid">
        <CollaborativeBenefits />
      </div>
      <div className="col-span-full my-20">
        <ClientGallery clients={clients} className={""} />
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
        className="col-span-full my-10  flex flex-col items-center"
      >
        <h2 className="text-center md:mb-16">Case Studies of GCD Clients</h2>
        <AllCaseStudies
          caseStudies={caseStudies}
          className="gap-5 md:grid-cols-3"
        />
      </section>
      {/* React Native Advantages Section */}
      <section
        id="react-native-advantages"
        className="col-span-full flex w-full flex-col md:mt-20"
      >
        <ReactNative bannerHidden />
      </section>
      {/* FAQs section */}
      <section className="col-span-full grid grid-cols-subgrid" id="faqs">
        <div className="col-span-full md:[&_p]:pr-[15vh]">{faqSection}</div>
      </section>
      {/* Call to Action section */}
      <section
        id="call-to-action"
        className="col-span-full flex flex-col items-center md:mb-20"
      >
        <CallToActionBlock mobileVariant />
      </section>
    </article>
  );
}

// TODO: This should be migrated to Contentful and support for 3 column layouts added
function CollaborativeBenefits() {
  return (
    <div className="main-content col-span-full mb-10 flex flex-col gap-10 md:mb-32 md:flex-row md:gap-20">
      <div className="w-full md:w-1/3">
        <h4 className="mb-2 uppercase">Increased Confidence</h4>
        <p>
          You&apos;ll have peace of mind knowing that your app is being
          developed with a deep understanding of your vision and a commitment to
          user satisfaction.
        </p>
      </div>
      <div className="w-full md:w-1/3">
        <h4 className="mb-2 uppercase">Higher Quality Product</h4>
        <p>
          By incorporating user feedback and addressing issues early, we deliver
          a polished, user-friendly app that exceeds expectations.
        </p>
      </div>
      <div className="w-full md:w-1/3">
        <h4 className="mb-2 uppercase">Cost and Time Savings</h4>
        <p>
          Our collaborative approach minimises the risk of costly rework,
          ensuring your project stays on track and within budget.
        </p>
      </div>
    </div>
  );
}
