import { getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import ContentfulMedia from "@/lib/contentful-media";
import { draftMode } from "next/headers";
import CallToActionBlock from "./components/contentful-content-blocks/CallToActionBlock";
import Link from "next/link";

export default async function HomePage() {
  const { isEnabled } = draftMode();
  const homePage = await getPageBySlug("home", isEnabled);

  const bannerImages: [] = homePage.bannerContent?.imagesCollection?.items;

  let contentBlocks = generateContentBlocks(
    homePage.pageContentCollection.items,
  );

  return (
    <div>
      <section className="main-content flex flex-col gap-8 md:flex-row">
        <div className="mb-8 mt-12 md:self-center">
          <h1 className="mb-5">
            Don&apos;t just <br /> build.Build better.
          </h1>
          <h4 className="max-w-[629px]">{homePage.subtitle}</h4>
          <Link
            href={"/contact"}
            className="btn green mt-8 flex w-44 items-center justify-center text-black"
          >
            Start a Project
          </Link>
        </div>

        {bannerImages.length && (
          <div className="w-full">
            <div className="grid grid-flow-col grid-rows-2 items-center gap-3 md:items-start md:justify-end lg:gap-5">
              {bannerImages.map((image: any, index) => (
                <ContentfulMedia
                  key={image.url}
                  src={image.url}
                  alt={image.title}
                  imageProps={{
                    priority: true,
                    className: `rounded-br-[30px] rounded-tl-[30px] object-cover md:w-full md:max-w-[305px] ${
                      index === 2
                        ? "row-span-2 h-[350px] md:h-[709px]"
                        : "h-[240px] md:h-[400px]"
                    }`,
                    width: image.width,
                    height: image.height,
                  }}
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
