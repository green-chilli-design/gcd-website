import Link from "next/link";
import { draftMode } from "next/headers";
import CoverImage from "@/app/cover-image";
import { getAllCaseStudies, getPageBySlug } from "@/lib/api";

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
      <h3 className="mb-3 text-3xl leading-snug">
        <Link href={`/case-studies/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <p className="mb-4 text-lg leading-relaxed">{summary}</p>
    </div>
  );
}

function AllCaseStudies({ caseStudies }: { caseStudies: any[] }) {
  return (
    <section>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
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
      <div className="mb-8">
        <CoverImage
          title={caseStudy.title}
          path="/case-studies"
          slug={caseStudy.slug}
          url={caseStudy.coverImage.url}
        />
      </div>
      <h3 className="mb-4 text-3xl leading-snug">
        <Link
          href={`/case-studies/${caseStudy.slug}`}
          className="hover:underline"
        >
          {caseStudy.title}
        </Link>
      </h3>
      <p className="mb-4 text-lg leading-relaxed">{caseStudy.summary}</p>
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
