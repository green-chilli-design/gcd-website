import Link from "next/link";
import { draftMode } from "next/headers";

import CoverImage from "@/app/cover-image";
import { Markdown } from "@/lib/markdown";

import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/api";
import { ResolvingMetadata, Metadata } from "next";

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
    <div className="mx-[18px] md:container md:mx-auto">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/case-studies" className="hover:underline">
          Case Studies
        </Link>
        .
      </h2>
      <article>
        <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
          {caseStudy.title}
        </h1>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={caseStudy.title} url={caseStudy.coverImage.url} />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-lg">
            <p>{caseStudy.summary}</p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="prose">
            {/* <Markdown content={caseStudy.content} /> */}
          </div>
        </div>
      </article>
    </div>
  );
}
