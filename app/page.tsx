import { getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import ContentfulImage from "@/lib/contentful-image";
import CallToActionBlock from "./components/contentful-content-blocks/CallToActionBlock";

export default async function HomePage() {
  const homePage = await getPageBySlug("home");

  const bannerImages: [] = homePage.bannerContent?.imagesCollection?.items;

  let contentBlocks = generateContentBlocks(
    homePage.pageContentCollection.items,
  );

  return (
    <div>
      <section className="main-content flex flex-col md:flex-row">
        <div className="mb-8 mt-12">
          <h1 className="mb-5">
            Don&apos;t just <br /> build.Build better.
          </h1>
          <h4 className="max-w-[629px]">{homePage.subtitle}</h4>
        </div>

        {bannerImages.length && (
          <div className="w-full md:mt-[-120px]">
            <div className="grid grid-flow-col grid-rows-2 items-center gap-3 md:items-start">
              {bannerImages.map((image: any, index) => (
                <ContentfulImage
                  key={image.url}
                  src={image.url}
                  alt={image.title}
                  width={image.width}
                  height={image.height}
                  className={`w-full max-w-[305px] rounded-br-[30px] rounded-tl-[30px] object-cover ${
                    index === 2
                      ? "row-span-2 h-[350px] md:h-[709px]"
                      : "h-[240px] md:h-[400px]"
                  }`}
                  sizes="(max-width: 320px) 50vw, 305px"
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <main className="mt-12">{contentBlocks}</main>

      {/* TODO: move this into contentful as a content type */}
      <CallToActionBlock />
    </div>
  );
}
