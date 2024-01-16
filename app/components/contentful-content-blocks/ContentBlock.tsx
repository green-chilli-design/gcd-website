import { Markdown } from "@/lib/markdown";

export default function ContentBlock({ contentBlock }: { contentBlock: any }) {
  return (
    <section
      key={contentBlock.heading}
      className="main-content py-5 text-center lg:py-16"
    >
      {contentBlock.heading && <h2 className="mb-5">{contentBlock.heading}</h2>}
      {contentBlock.subHeading && (
        <h5 className="mb-2">{contentBlock.subHeading}</h5>
      )}
      <Markdown content={contentBlock.contentBody} />
    </section>
  );
}
