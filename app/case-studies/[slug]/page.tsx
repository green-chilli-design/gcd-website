import DiscoveryProcess from "@/app/components/DiscoveryProcess";
import ReactNative from "@/app/components/ReactNative";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import ContentfulMedia from "@/lib/contentful-media";
import { Markdown } from "@/lib/markdown";
import type { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";

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
  const allCaseStudies = await getCaseStudies(false, null);

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
        <div className="main-content">
          <h1 className="mb-5 mt-16 lg:mb-[416px] lg:mt-[210px] lg:w-1/2 xl:mb-[616px] xl:mt-[410px]">
            {caseStudy.title}
          </h1>
        </div>
        <div className="relative mb-32 h-[450px] w-full bg-scroll sm:h-[700px] md:h-[812px] lg:absolute lg:right-0 lg:top-0 lg:w-1/2 xl:h-[1183px]">
          <ContentfulMedia
            src={caseStudy.coverImage.url}
            alt={caseStudy.title}
            imageProps={{
              priority: true,
              className: "rounded-br-[100px] object-cover",
              fill: true,
            }}
          />
        </div>
      </section>

      {caseStudy.description && (
        <section className="main-content mb-32 flex justify-center">
          <div className="w-full lg:max-w-[846px] xl:max-w-[1274px]">
            <Markdown content={caseStudy.description} />
          </div>
        </section>
      )}

      {caseStudy.body && (
        <section className="main-content mb-32 flex justify-center">
          <div className="w-full lg:max-w-[846px]">
            <Markdown content={caseStudy.body} />
          </div>
        </section>
      )}

      <main className="mt-[200px]">{contentBlocks}</main>

      {caseStudy.backgroundImage?.url && (
        <section>
          <div
            className="h-[400px] w-full rounded-br-[100px] rounded-tl-[100px] bg-cover bg-fixed"
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
