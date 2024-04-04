import CallToActionBlock from "@/app/components/contentful-content-blocks/CallToActionBlock";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import ContentfulMedia from "@/lib/contentful-media";
import { Markdown } from "@/lib/markdown";
import type { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import Link from "next/link";
import { CaseStudyPreview } from "../all-case-studies";
import SocialShare from "@/app/components/SocialShare";

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

  const caseStudies = await getCaseStudies(isEnabled, caseStudy.category?.name);
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

      <main className="main-content justify-between md:flex md:flex-row-reverse">
        {/* sticky sidebar */}
        <div className="mb-24 self-start md:sticky md:top-0 md:mb-10 md:ml-10 md:max-w-[197px]">
          {caseStudy.client?.name && (
            <div>
              <p className="small font-bold">Client:</p>
              <p className="small">{caseStudy.client.name}</p>
              <br />
            </div>
          )}
          {caseStudy.projectType && (
            <div>
              <p className="small font-bold">Project Type:</p>
              <p className="small">{caseStudy.projectType}</p>
              <br />
            </div>
          )}
          {caseStudy.industry && (
            <div>
              <p className="small font-bold">Industry:</p>
              <p className="small">{caseStudy.industry}</p>
              <br />
            </div>
          )}
          {caseStudy.deliverables?.length && (
            <div>
              <p className="small font-bold">Deliverables:</p>
              <p className="small">{caseStudy.deliverables.join(", ")}</p>
              <br />
            </div>
          )}
          <SocialShare />
        </div>

        {/* case study content */}
        <div className="w-full">
          {caseStudy.description && (
            <section className="mb-24 flex justify-center md:mb-32">
              <div className="w-full lg:max-w-[846px]">
                <Markdown content={caseStudy.description} />
              </div>
            </section>
          )}

          {caseStudy.body && (
            <section className="mb-24 flex justify-center md:mb-32">
              <div className="w-full lg:max-w-[846px]">
                <Markdown content={caseStudy.body} />
              </div>
            </section>
          )}

          <div className="mt-[200px]">{contentBlocks}</div>
        </div>
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
        <div className="mb-10 flex flex-row flex-wrap items-center justify-between gap-5 md:flex-nowrap">
          <h2>Explore more like this</h2>
          <Link
            href={"/case-studies"}
            className="btn dark:light dark flex items-center justify-center p-5 text-neutral dark:text-black"
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
