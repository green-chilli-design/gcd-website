import Link from "next/link";
import { draftMode } from "next/headers";

import CoverImage from "@/app/cover-image";
import { Markdown } from "@/lib/markdown";

import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/api";
import { ResolvingMetadata, Metadata } from "next";
import ContentfulImage from "@/lib/contentful-image";

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
      <section className="main-content">
        <h1 className="mb-[318px] mt-[210px] max-w-[522px] leading-[84px]">
          {caseStudy.title}
        </h1>
      </section>
      <div className="absolute right-0 top-[140px] bg-scroll">
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

      {caseStudy.featureSection && (
        <section className="main-content flex flex-row flex-wrap justify-between">
          <Markdown content={caseStudy.featureSection} />
          <ContentfulImage
            priority
            width={812}
            height={812}
            src={caseStudy.featureImage.url}
            alt={"Feature Image"}
            className="rounded-br-[30px]"
          />
        </section>
      )}
    </div>
  );
}
