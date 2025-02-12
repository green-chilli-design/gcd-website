import ViewMore from "@/app/components/ViewMore";
import CoverImage from "@/app/(main)/cover-image";
import { getCaseStudies, getCategoryByName, getPageBySlug } from "@/lib/api";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import AllCaseStudies from "./all-case-studies";
import CaseStudySearchBar from "./case-study-search-bar";

const title = "Our Work | Case Studies | App, Web Design | GCD";
export const metadata: Metadata = {
  title,
  description:
    "GCD case studies highlighting recent work in custom software, mobile applications, performance websites and digital strategy.",
  openGraph: {
    title,
  },
  twitter: {
    title,
  },
};

// This component passed as a fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<CaseStudySearchBar>` component.
function SearchBarFallback() {
  return <>placeholder</>;
}

function Intro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="main-content mb-16 md:mb-24">
      <h2 className="mb-5">{title}</h2>
      <h4 className="max-w-[629px]">{subtitle}</h4>
    </section>
  );
}

function FeaturedCaseStudy({ caseStudy }: { caseStudy: any }) {
  if (!caseStudy) return null;
  return (
    <section className="main-content mb-24">
      <div className="mb-10">
        <CoverImage
          title={caseStudy.title}
          path="/case-studies"
          slug={caseStudy.slug}
          url={caseStudy.coverImage.url}
        />
      </div>
      <div className="flex justify-between">
        <div className="max-w-[740px]">
          <h3 className="mb-5">{caseStudy.title}</h3>
          <p className="mb-5">{caseStudy.summary}</p>
        </div>
        <div className="ml-10 shrink-0">
          <ViewMore path={`/case-studies/${caseStudy.slug}`} />
        </div>
      </div>
    </section>
  );
}

export default async function Page({ searchParams }: { searchParams: any }) {
  const category = searchParams?.category || null;
  const { isEnabled } = draftMode();
  const { title, subtitle } = await getPageBySlug("case-studies", isEnabled);
  const caseStudies = await getCaseStudies(isEnabled, category);
  const total = caseStudies?.length;
  const caseStudyCategories = await getCategoryByName(
    "Case Studies",
    isEnabled,
  );

  let featuredCaseStudy;
  if (caseStudies?.length > 0) {
    featuredCaseStudy = caseStudies?.find((c) => c.featured);
    if (featuredCaseStudy) {
      caseStudies.splice(caseStudies.indexOf(featuredCaseStudy), 1);
    } else {
      featuredCaseStudy = caseStudies[0];
      caseStudies.splice(0, 1);
    }
  }

  return (
    <div className="mb-20 mt-24 lg:mt-28">
      <Intro title={title} subtitle={subtitle} />
      <div className="main-content mb-20 flex w-full flex-col gap-5">
        <Suspense fallback={<SearchBarFallback />}>
          <CaseStudySearchBar
            categories={caseStudyCategories?.subCategoriesCollection?.items}
          />
        </Suspense>
      </div>

      {featuredCaseStudy && <FeaturedCaseStudy caseStudy={featuredCaseStudy} />}
      {total > 0 ? (
        <AllCaseStudies caseStudies={caseStudies} />
      ) : (
        <div className="main-content flex flex-col items-center justify-center py-12">
          <p className="mb-5">No case studies found.</p>
          <Link
            href={"/case-studies"}
            className="btn dark:light dark flex w-44 items-center justify-center p-5 text-neutral dark:text-black"
          >
            Clear Filters
          </Link>
        </div>
      )}
    </div>
  );
}
