import { draftMode } from "next/headers";
import CoverImage from "@/app/cover-image";
import { getAllCaseStudies, getPageBySlug } from "@/lib/api";
import ViewMore from "@/app/components/ViewMore";
import AllCaseStudies from "./all-case-studies";
import CaseStudySearchBar from "./case-study-search-bar";
import { Suspense } from "react";

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

// This component passed as a fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<SearchBar>` component.
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
          <h3 className="mb-5 text-4xl">{caseStudy.title}</h3>
          <p className="mb-5">{caseStudy.summary}</p>
        </div>
        <div className="ml-10 shrink-0">
          <ViewMore path={`/case-studies/${caseStudy.slug}`} />
        </div>
      </div>
    </section>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // TODO: use the search params (category) to filter case studies, and add a search bar / filter UI
  console.log(searchParams);

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
    <div className="mb-20 mt-24 lg:mt-28">
      <Suspense fallback={<SearchBarFallback />}>
        <CaseStudySearchBar />
      </Suspense>
      <Intro title={title} subtitle={subtitle} />
      <FeaturedCaseStudy caseStudy={featuredCaseStudy} />
      <AllCaseStudies caseStudies={allCaseStudies} showMore={true} />
    </div>
  );
}
