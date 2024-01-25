import { draftMode } from "next/headers";
import { Markdown } from "@/lib/markdown";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/api";
import { ResolvingMetadata, Metadata } from "next";
import ContentfulImage from "@/lib/contentful-image";
import ReactNative from "@/app/components/ReactNative";
import DiscoveryProcess from "@/app/components/DiscoveryProcess";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const caseStudy = await getCaseStudyBySlug(params.slug, false);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `GCD | ${caseStudy.title}`,
    openGraph: {
      title: `GCD | ${caseStudy.title}`,
      images: [caseStudy.coverImage.url, ...previousImages],
    },
    twitter: {
      title: `GCD | ${caseStudy.title}`,
      images: [caseStudy.coverImage.url, ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const allCaseStudies = await getAllCaseStudies(false);

  return allCaseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const caseStudy = await getCaseStudyBySlug(params.slug, isEnabled);
  let contentBlocks = generateContentBlocks(
    caseStudy.pageContentCollection.items,
  );

  return (
    <div>
      <section className="xl:mb-[44rem]">
        <div className="main-content lg:w-1/3 ">
          <h1 className="mb-5 mt-16 leading-[84px] lg:mb-[318px] lg:mt-[210px]">
            {caseStudy.title}
          </h1>
        </div>
        <div className="relative mb-32 h-[450px] w-full bg-scroll sm:h-[700px] md:h-[812px] lg:absolute lg:right-0 lg:top-0 lg:w-1/2 xl:h-[1183px]">
          <ContentfulImage
            priority
            src={caseStudy.coverImage.url}
            alt={caseStudy.title}
            className="rounded-br-[30px]"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </section>

      {caseStudy.description && (
        <section className="main-content mb-32 flex justify-center">
          <div className=" w-full lg:max-w-[846px] xl:max-w-[1274px]">
            <Markdown content={caseStudy.description} />
          </div>
        </section>
      )}

      <main className="mt-[200px]">{contentBlocks}</main>

      {caseStudy.backgroundImage?.url && (
        <section>
          <div
            className="h-[400px] w-full rounded-br-[30px] rounded-tl-[30px] bg-cover bg-fixed"
            style={{
              backgroundImage: `url(${caseStudy.backgroundImage.url})`,
            }}
          ></div>
        </section>
      )}

      <DiscoveryProcess />

      <ReactNative />
    </div>
  );
}
