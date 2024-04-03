import DiscoveryProcess from "@/app/components/DiscoveryProcess";
import ReactNative from "@/app/components/ReactNative";
import CallToActionBlock from "@/app/components/contentful-content-blocks/CallToActionBlock";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import ContentfulMedia from "@/lib/contentful-media";
import { Markdown } from "@/lib/markdown";
import type { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { CaseStudyPreview } from "../all-case-studies";

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
  const allCaseStudies = await getCaseStudies(false, null);

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
  let contentBlocks = generateContentBlocks(
    caseStudy.pageContentCollection.items,
  );

  const caseStudies = await getCaseStudies(isEnabled, caseStudy.category.name);
  if (caseStudies.length) {
    caseStudies.splice(
      caseStudies.findIndex((c) => c.slug === caseStudy.slug),
      1,
    );
  }

  return (
    <div>
      <section className="mb-24 mt-20 flex flex-col gap-3 lg:mt-0 lg:flex-row lg:items-center">
        <div className="main-content mb-6 h-full w-full lg:mt-20">
          <h1>{caseStudy.title}</h1>
        </div>
        <div className="h-full w-full lg:max-w-[710px]">
          <ContentfulMedia
            src={caseStudy.coverImage.url}
            alt={caseStudy.title}
            imageProps={{
              priority: true,
              className:
                "rounded-br-[30px] rounded-tl-[30px] object-cover w-full h-full",
              width: caseStudy.coverImage.width,
              height: caseStudy.coverImage.height,
              sizes: "(max-width: 320px) 100vw, 710px",
            }}
          />
        </div>
      </section>

      <main>
        {caseStudy.description && (
          <section className="main-content mb-32 flex justify-center">
            <div className="w-full lg:max-w-[846px]">
              <Markdown content={caseStudy.description} />
            </div>
          </section>
        )}

        {caseStudy.body && (
          <section className="main-content mb-32 flex justify-center">
            <div className="w-full font-light lg:max-w-[846px]">
              <Markdown content={caseStudy.body} />
            </div>
          </section>
        )}

        <div className="mt-[200px]">{contentBlocks}</div>
      </main>

      {caseStudy.backgroundImage?.url && (
        <section>
          <div
            className="h-[400px] w-full rounded-br-[100px] rounded-tl-[100px] bg-cover bg-fixed"
            style={{
              backgroundImage: `url(${caseStudy.backgroundImage.url})`,
            }}
          ></div>
        </section>
      )}

      <section className="main-content">
        <div className="mb-10 flex flex-row items-center justify-between">
          <h2>Explore more like this</h2>
          <Link
            href={"/case-studies"}
            className="btn dark:light dark flex items-center justify-center p-5 dark:text-black"
          >
            More Case Studies
          </Link>
        </div>
        <div className="w-full">
          {caseStudies.length && (
            <div className="mb-24 grid grid-cols-1 gap-20 md:grid-cols-2 xl:grid-cols-3">
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
          )}
        </div>
      </section>

      <CallToActionBlock />
    </div>
  );
}
