"use client";

import CoverImage from "@/app/cover-image";
import { useState } from "react";
import ViewMore from "../components/ViewMore";
import ReactNative from "../components/ReactNative";

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
          <h3 className="mb-5 text-4xl">{title}</h3>
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
  showMore,
}: {
  caseStudies: any[];
  showMore: boolean;
}) {
  const [itemNum, setItemNum] = useState(2);
  function handleClick() {
    setItemNum((prevItemNum) => prevItemNum + 2);
  }
  console.log(caseStudies.length, itemNum);
  itemNum >= caseStudies.length ? (showMore = false) : (showMore = true);

  return (
    <section>
      <div className="main-content mb-24 grid grid-cols-1 gap-x-5 gap-y-20 md:grid-cols-2">
        {caseStudies
          ?.slice(0, itemNum)
          .map((caseStudy) => (
            <CaseStudyPreview
              key={caseStudy.slug}
              title={caseStudy.title}
              coverImage={caseStudy.coverImage}
              slug={caseStudy.slug}
              summary={caseStudy.summary}
            />
          ))}
      </div>

      {showMore && (
        <div className="mb-24 flex justify-center">
          <button
            type="button"
            onClick={handleClick}
            className="btn dark:light dark w-32 text-neutral dark:text-black"
          >
            Load More
          </button>
        </div>
      )}

      <ReactNative />
    </section>
  );
}
