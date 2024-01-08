import Link from "next/link";
import { draftMode } from "next/headers";

import CoverImage from "@/app/cover-image";
import { Markdown } from "@/lib/markdown";

import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/api";
import { ResolvingMetadata, Metadata } from "next";
import ContentfulImage from "@/lib/contentful-image";
import ReactNative from "@/app/components/ReactNative";
import DiscoveryProcess from "@/app/components/DiscoveryProcess";

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

  return (
    <div>
      <section className="main-content w-1/3">
        <h1 className="mb-[318px] mt-[210px]  max-w-[522px] leading-[84px]">
          {caseStudy.title}
        </h1>
      </section>
      <div className="max-w-2/3 absolute right-0 top-0 bg-scroll">
        <ContentfulImage
          priority
          width={812}
          height={812}
          src={caseStudy.coverImage.url}
          alt={caseStudy.title}
          className="rounded-br-[30px]"
        />
      </div>

      {caseStudy.description && (
        <section className="mx-auto mb-32 max-w-[846px] px-0">
          <Markdown content={caseStudy.description} />
        </section>
      )}

      <section className="main-content mb-[120px] flex flex-row flex-wrap items-center justify-between lg:flex-nowrap lg:gap-16 xl:gap-32">
        {caseStudy.featureSection && (
          <div>
            <Markdown content={caseStudy.featureSection} />
          </div>
        )}
        {caseStudy.featureImage?.url && (
          <ContentfulImage
            priority
            width={374}
            height={499}
            src={caseStudy.featureImage.url}
            alt={"Feature Image"}
            className="shrink-0 rounded-br-[30px] rounded-tl-[30px]"
          />
        )}
      </section>

      {caseStudy.backgroundImage?.url && (
        <section>
          <div
            className="h-[400px] w-full bg-cover bg-fixed"
            style={{
              backgroundImage: `url(${caseStudy.backgroundImage.url})`,
            }}
          ></div>
        </section>
      )}

      {/* <DiscoveryProcess /> */}

      <ReactNative />
    </div>
  );
}
