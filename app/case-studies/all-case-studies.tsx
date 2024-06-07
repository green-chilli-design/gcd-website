"use client";

import CoverImage from "@/app/cover-image";
import ReactNative from "../components/ReactNative";
import ViewMore from "../components/ViewMore";

export function CaseStudyPreview({
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
      <div className="mb-10">
        <CoverImage
          title={title}
          path="/case-studies"
          slug={slug}
          url={coverImage.url}
        />
      </div>
      <div className="flex w-full justify-between">
        <div>
          <h3 className="mb-5">{title}</h3>
          <p className="mb-5">{summary}</p>
        </div>
        <div className="ml-10 shrink-0">
          <ViewMore path={`/case-studies/${slug}`} />
        </div>
      </div>
    </div>
  );
}

export default function AllCaseStudies({
  caseStudies,
}: {
  caseStudies: any[];
}) {
  return (
    <section>
      <div className="main-content mb-24 grid grid-cols-1 gap-20 md:grid-cols-2 xl:grid-cols-3">
        {caseStudies.map((caseStudy) => (
          <CaseStudyPreview
            key={caseStudy.slug}
            title={caseStudy.title}
            coverImage={caseStudy.coverImage}
            slug={caseStudy.slug}
            summary={caseStudy.summary}
          />
        ))}
      </div>
      <ReactNative />
    </section>
  );
}
