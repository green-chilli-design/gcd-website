import Link from "next/link";
import { draftMode } from "next/headers";

import CoverImage from "../cover-image";

import { getAllCaseStudies } from "@/lib/api";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mb-16 md:mb-12">
      <h1 className="text-xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
        Case Studies.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Proudly delivering the technology behind our clients' success stories.
      </h2>
    </section>
  );
}

function CaseStudyPreview({
  title,
  summary,
  coverImage,
  slug,
}: {
  title: string;
  summary: string;
  coverImage: any;
  slug: string;
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          title={title}
          path="/case-studies"
          slug={slug}
          url={coverImage.url}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/case-studies/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <p className="text-lg leading-relaxed mb-4">{summary}</p>
    </div>
  );
}

function AllCaseStudies({ caseStudies }: { caseStudies: any[] }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {caseStudies?.map((caseStudy) => (
          <CaseStudyPreview
            key={caseStudy.slug}
            title={caseStudy.title}
            coverImage={caseStudy.coverImage}
            slug={caseStudy.slug}
            summary={caseStudy.summary}
          />
        ))}
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allCaseStudies = await getAllCaseStudies(isEnabled);

  return (
    <div className="container mx-auto px-5">
      <Intro />
      <AllCaseStudies caseStudies={allCaseStudies} />
    </div>
  );
}
