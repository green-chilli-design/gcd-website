import ContentfulImage from "./contentful-image";
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
          <section key={value.heading} className="py-5 lg:py-16">
            {value.heading && <h2 className="mb-5">{value.heading}</h2>}
            {value.subHeading && <h5 className="mb-2">{value.subHeading}</h5>}
            <Markdown content={value.contentBody} />
          </section>
        );
      case "ContentBlockWithImage":
        return (
          <section
            key={value.heading}
            className={`flex flex-wrap items-center justify-center gap-20 py-5 lg:flex-nowrap lg:py-16 ${
              value.imagePosition === "Left" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div>
              {value.heading && <h2 className="mb-5">{value.heading}</h2>}
              <Markdown content={value.body} />
            </div>
            <ContentfulImage
              priority
              width={value.image.width}
              height={value.image.height}
              src={value.image.url}
              alt={value.heading}
              className="rounded-br-[30px] rounded-tl-[30px]"
            />
          </section>
        );
      case "ImageBlock":
      // return <ImageBlock block={value} />; // TODO: Enable different reusable content blocks -> React Components here
      case "VideoBlock":
      // return <VideoBlock block={value} />;
      default:
        return null;
    }
  });
}
