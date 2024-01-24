"use client";

import ContentfulImage from "@/lib/contentful-image";
import { Markdown } from "@/lib/markdown";
import { useTheme } from "next-themes";

export default function ContentBlockWithImage({
  contentBlock,
}: {
  contentBlock: any;
}) {
  const { resolvedTheme } = useTheme();

  const image =
    resolvedTheme === "dark" && contentBlock.darkModeImage
      ? contentBlock.darkModeImage
      : contentBlock.image;

  return (
    <section
      key={contentBlock.heading}
      className={`main-content mb-20 flex flex-wrap items-center justify-center gap-20 py-5 lg:flex-nowrap lg:py-16 xl:gap-80 ${
        contentBlock.imagePosition === "Left" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="lg:1/2 w-full xl:w-2/3">
        {contentBlock.heading && (
          <h2 className="mb-5">{contentBlock.heading}</h2>
        )}
        <div className="max-w-[740px]">
          <Markdown content={contentBlock.body} />
        </div>
      </div>
      <ContentfulImage
        sizes="(max-width: 768px) 66vw, (max-width: 1024px) 50vw, 33vw"
        width={image.width}
        height={image.height}
        src={image.url}
        alt={contentBlock.heading}
        className="lg:1/2 w-full rounded-br-[30px] rounded-tl-[30px] sm:w-2/3 xl:w-1/3"
      />
    </section>
  );
}
