import OurTeam from "@/app/components/contentful-content-blocks/OurTeam";
import ContentBlock from "@/app/components/contentful-content-blocks/ContentBlock";
import ContentBlockWithImage from "@/app/components/contentful-content-blocks/ContentBlockWithImage";
import OurClients from "@/app/components/contentful-content-blocks/OurClients";

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
        if (value.heading === "Our Team") {
          return <OurTeam key={value.heading} contentBlock={value} />;
        }
        if (value.heading === "Our Clients") {
          return <OurClients key={value.heading} contentBlock={value} />;
        }
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
