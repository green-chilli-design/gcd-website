import { Markdown } from "./markdown";

/**
 * TODO: This should be turned into some global re-usable component factory
 *
 * This function generates the content blocks for pages with content blocks
 *
 * Depending on the type of content block, it will render a different component (TODO)
 *
 * @param contentBody
 * @returns A list of content blocks
 */
export function generateContentBlocks(contentBody: any[]) {
  return Object.entries(contentBody).map(([key, value]) => {
    switch (value.__typename) {
      case "ContentBlock":
        return (
          <section key={value} className="py-5 lg:py-16">
            {value.heading && <h2 className="mb-5">{value.heading}</h2>}
            {value.subHeading && <h5 className="mb-2">{value.subHeading}</h5>}
            <Markdown content={value.contentBody} />
          </section>
        );
      case "ImageBlock":
      // return <ImageBlock block={value} />; // TODO: Enable different reusable content blocks -> React Components here
      case "VideoBlock":
      // return <VideoBlock block={value} />;
    }
  });
}
