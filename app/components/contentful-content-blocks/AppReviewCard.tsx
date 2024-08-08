"use client";

import ContentfulMedia from "@/lib/contentful-media";
import { Markdown } from "@/lib/markdown";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function AppReviewCard({ contentBlock }: { contentBlock: any }) {
  const { resolvedTheme } = useTheme();

  return (
    <section
      key={contentBlock.heading}
      className=" col-span-full my-10 grid grid-cols-subgrid"
    >
      {/* Image Column */}
      <div
        id="img-col"
        className={`relative col-span-full h-[50vh] max-h-[1000px] md:col-span-6 ${
          !contentBlock.orientation && "md:order-2"
        }`}
      >
        <ContentfulMedia
          key={contentBlock.image.url}
          src={contentBlock.image.url}
          alt={contentBlock.image.title}
          imageProps={{
            priority: true,
            className: `col-span-full md:col-span-4 -rounded-br-[30px] rounded-tl-[30px] min-h-full object-scale-down`,
            fill: true,
          }}
        />
      </div>
      <div
        id="review-col"
        className={`col-span-full my-auto  flex flex-col gap-10 pt-10 md:col-span-6 md:px-20 md:pt-0`}
      >
        <h1 className="text-9xl md:text-10xl">{contentBlock.title}</h1>
        <h3 className="text-6xl font-semibold uppercase md:text-7xl">
          {contentBlock.subtitle}
        </h3>
        <div id="card-cta">
          <Link
            href={"/case-studies/" + contentBlock.caseStudy.slug}
            className="btn dark:light dark flex  h-fit w-fit flex-col flex-nowrap whitespace-nowrap px-5  py-1 text-neutral dark:text-black"
          >
            See the Case Study
          </Link>
        </div>
        <div
          id="review-quote"
          className="rounded-3xl bg-dark-offwhite p-[20px]  dark:bg-dark-green"
        >
          <div>{contentBlock.reviewQuote}</div>
          <div className="mt-5 text-right text-sm text-dark-grey">
            <div>App Store Review</div>
            <div className=" tracking-wider text-black dark:text-white">
              ★★★★★
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
