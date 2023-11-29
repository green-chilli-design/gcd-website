import Link from "next/link";
import { draftMode } from "next/headers";

import CoverImage from "../../cover-image";
import { Markdown } from "@/lib/markdown";

import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/api";

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
    <div className="container">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/case-studies" className="hover:underline">
          Case Studies
        </Link>
        .
      </h2>
      <article>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          {caseStudy.title}
        </h1>
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={caseStudy.title} url={caseStudy.coverImage.url} />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 text-lg">
            <p>{caseStudy.summary}</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="prose">
            {/* <Markdown content={caseStudy.content} /> */}
          </div>
        </div>
      </article>
    </div>
  );
}
