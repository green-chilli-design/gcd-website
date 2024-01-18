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
      <section>
        <div className="main-content w-2/3">
          <h1 className="mb-[318px] mt-[210px] leading-[84px]">
            {caseStudy.title}
          </h1>
        </div>
        <div className="absolute right-0 top-0 w-1/2 bg-scroll">
          <ContentfulImage
            priority
            width={812}
            height={812}
            src={caseStudy.coverImage.url}
            alt={caseStudy.title}
            className="rounded-br-[30px]"
          />
        </div>
      </section>

      {caseStudy.description && (
        <section className="mx-auto mb-32 max-w-[846px] px-0">
          <Markdown content={caseStudy.description} />
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
