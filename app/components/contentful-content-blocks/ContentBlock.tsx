import { Markdown } from "@/lib/markdown";
import { ContentBlock } from "@/lib/api";

export default function ContentBlock({
  contentBlock,
}: {
  contentBlock: ContentBlock;
}) {
  return (
    <section className="main-content flex justify-center py-20 lg:py-32">
      <div
        className={`max-w-[846px] text-${contentBlock.textAlignment.toLowerCase()}`}
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
