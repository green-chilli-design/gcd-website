import Link from "next/link";
import { draftMode } from "next/headers";

import CoverImage from "@/app/cover-image";

import { getAllCaseStudies, getPageBySlug } from "@/lib/api";

function Intro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="mb-16 md:mb-24">
      <h2 className="mb-5">{title}</h2>
      <h4>{subtitle}</h4>
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
  const { title, subtitle, pageContentCollection } = await getPageBySlug(
    "case-studies"
  );
  const allCaseStudies = await getAllCaseStudies(isEnabled);

  return (
    <div className="md:container md:mx-auto mx-[18px] mb-20 mt-24 lg:mt-28">
      <Intro title={title} subtitle={subtitle} />
      <AllCaseStudies caseStudies={allCaseStudies} />
    </div>
  );
}
