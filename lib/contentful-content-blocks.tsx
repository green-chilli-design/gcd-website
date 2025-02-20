import OurTeam from "@/app/components/contentful-content-blocks/OurTeam";
import ContentBlock from "@/app/components/contentful-content-blocks/ContentBlock";
import ContentBlockWithImage from "@/app/components/contentful-content-blocks/ContentBlockWithImage";
import OurClients from "@/app/components/contentful-content-blocks/OurClients";
import SuccessSection from "@/app/components/contentful-content-blocks/SuccessSection";
import ServicesSection from "@/app/components/contentful-content-blocks/ServicesSection";
import AppReviewCard from "@/app/components/contentful-content-blocks/AppReviewCard";

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
        if (value.heading === "Success") {
          return <SuccessSection key={value.heading} contentBlock={value} />;
        }
        if (value.heading === "Services") {
          return <ServicesSection key={value.heading} contentBlock={value} />;
        }
        if (value.heading === "Transforming Business Ideas into Reality") {
          return (
            <ContentBlock
              contentBlock={value}
              layout="two-column"
              className="main-content col-span-full gap-10 lg:gap-20"
            />
          );
        }
        if (value.heading === "FAQ's") {
          return (
            <ContentBlock
              contentBlock={value}
              layout="full-bleed"
              className="main-content col-span-full gap-10 lg:gap-20"
            />
          );
        }
        if (
          value.heading ===
          "Our Collaborative Approach to Mobile App Development"
        ) {
          return (
            <ContentBlock
              contentBlock={value}
              layout="full-bleed"
              className="main-content col-span-full flex max-w-[1200px] flex-col  p-0 text-left"
            />
          );
        }
        return <ContentBlock key={value.heading} contentBlock={value} />;
      case "ContentBlockWithImage":
        if (value.heading === "Unmatched support") {
          return (
            <div className="-mb-10">
              <ContentBlockWithImage key={value.heading} contentBlock={value} />
            </div>
          );
        } else {
          return (
            <ContentBlockWithImage key={value.heading} contentBlock={value} />
          );
        }
      case "AppReviewCard":
        return <AppReviewCard key={value.heading} contentBlock={value} />;
      default:
        return null;
    }
  });
}
