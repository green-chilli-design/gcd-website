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
      className={`flex flex-wrap items-center justify-center gap-20 py-5 lg:flex-nowrap lg:py-16 ${
        contentBlock.imagePosition === "Left" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div>
        {contentBlock.heading && (
          <h2 className="mb-5">{contentBlock.heading}</h2>
        )}
        <Markdown content={contentBlock.body} />
      </div>
      <ContentfulImage
        priority
        width={image.width}
        height={image.height}
        src={image.url}
        alt={contentBlock.heading}
        className="rounded-br-[30px] rounded-tl-[30px]"
      />
    </section>
  );
}
