import { Markdown } from "@/lib/markdown";

export default function ContentBlock({ contentBlock }: { contentBlock: any }) {
  return (
    <section className="main-content flex justify-center py-5 lg:py-40">
      <div className="max-w-[846px] text-center">
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
