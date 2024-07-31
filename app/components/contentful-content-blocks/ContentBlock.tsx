import { Markdown } from "@/lib/markdown";
import { ContentBlock } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function ContentBlock({
  contentBlock,
  layout,
  className,
}: {
  contentBlock: ContentBlock;
  layout?: "centered" | "two-column" | "full-bleed";
  className?: string;
}) {
  if (layout === "two-column") {
    return (
      <section className={cn("flex flex-col md:flex-row", className)}>
        <div id="section-heading">
          <h2>{contentBlock.heading}</h2>
          <h5>{contentBlock.subHeading}</h5>
        </div>
        <div id="section-body">
          <Markdown content={contentBlock.contentBody} />
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "main-content flex justify-center py-20 lg:py-32",
        className,
      )}
    >
      <div
        className={`${
          layout != "full-bleed" && "max-w-[846px]"
        } text-${contentBlock.textAlignment.toLowerCase()}`}
      >
        {contentBlock.heading && (
          <h2 className="mb-5">{contentBlock.heading}</h2>
        )}
        {contentBlock.subHeading && (
          <h5 className="mb-2">{contentBlock.subHeading}</h5>
        )}
        <Markdown content={contentBlock.contentBody} />
      </div>
    </section>
  );
}
