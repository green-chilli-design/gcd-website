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
      className={`main-content mb-20 flex flex-wrap items-center justify-center gap-20 py-5 lg:flex-nowrap lg:py-16 ${
        contentBlock.imagePosition === "Left" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="w-full lg:w-3/5">
        {contentBlock.heading && (
          <h2 className="mb-5">{contentBlock.heading}</h2>
        )}
        <div className="max-w-[740px]">
          <Markdown content={contentBlock.body} />
        </div>
      </div>
      <ContentfulImage
        sizes="(max-width: 768px) 66vw, 33vw"
        width={image.width}
        height={image.height}
        src={image.url}
        alt={contentBlock.heading}
        className="w-full rounded-br-[30px] rounded-tl-[30px] sm:w-2/3 lg:w-2/5"
      />
    </section>
  );
}
