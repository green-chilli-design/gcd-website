import Link from "next/link";
import { draftMode } from "next/headers";
import CoverImage from "@/app/cover-image";
import { getAllCaseStudies, getPageBySlug } from "@/lib/api";
import ViewMore from "@/app/components/ViewMore";

const title = "GCD | Case Studies";
export const metadata = {
  title,
  openGraph: {
    title,
  },
  twitter: {
    title,
  },
};

function Intro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="mb-16 md:mb-24">
      <h2 className="mb-5">{title}</h2>
      <h4 className="max-w-[629px]">{subtitle}</h4>
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
      <div className="mb-10">
        <CoverImage
          title={title}
          path="/case-studies"
          slug={slug}
          url={coverImage.url}
        />
      </div>
      <div className="w-full">
        <h3 className="mb-5 text-4xl">{title}</h3>
        <p className="mb-5">{summary}</p>
        <ViewMore path={`/case-studies/${slug}`} />
      </div>
    </div>
  );
}

function AllCaseStudies({ caseStudies }: { caseStudies: any[] }) {
  return (
    <section>
      <div className="mb-32 grid grid-cols-1 gap-x-5 gap-y-20 md:grid-cols-2">
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

function FeaturedCaseStudy({ caseStudy }: { caseStudy: any }) {
  if (!caseStudy) return null;
  return (
    <section className="mb-32">
      <div className="mb-10">
        <CoverImage
          title={caseStudy.title}
          path="/case-studies"
          slug={caseStudy.slug}
          url={caseStudy.coverImage.url}
        />
      </div>
      <div className="max-w-[740px]">
        <h3 className="mb-5 text-4xl">{caseStudy.title}</h3>
        <p className="mb-5">{caseStudy.summary}</p>
        <ViewMore path={`/case-studies/${caseStudy.slug}`} />
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const { title, subtitle } = await getPageBySlug("case-studies");
  const allCaseStudies = await getAllCaseStudies(isEnabled);
  let featuredCaseStudy = allCaseStudies.find((c) => c.featured);
  if (featuredCaseStudy) {
    allCaseStudies.splice(allCaseStudies.indexOf(featuredCaseStudy), 1);
  } else {
    featuredCaseStudy = allCaseStudies[0];
    allCaseStudies.splice(0, 1);
  }

  return (
    <div className="main-content mb-20 mt-24 lg:mt-28">
      <Intro title={title} subtitle={subtitle} />
      <FeaturedCaseStudy caseStudy={featuredCaseStudy} />
      <AllCaseStudies caseStudies={allCaseStudies} />
    </div>
  );
}
