import ContentBlock from "@/app/components/contentful-content-blocks/ContentBlock";
import ContentBlockWithImage from "@/app/components/contentful-content-blocks/ContentBlockWithImage";

/**
 * This function generates the content blocks for pages with content blocks
 *
 * Depending on the type of content block, it will render a different component
 *
 * @param contentBody
 * @returns A list of content blocks
 */
export function generateContentBlocks(contentBody: any[]) {
  return Object.entries(contentBody).map(([key, value]) => {
    switch (value.__typename) {
      case "ContentBlock":
        return <ContentBlock key={value.heading} contentBlock={value} />;
      case "ContentBlockWithImage":
        return (
          <ContentBlockWithImage key={value.heading} contentBlock={value} />
        );
      default:
        return null;
    }
  });
}
