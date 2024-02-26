import { getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import ContentfulImage from "@/lib/contentful-image";
import CallToActionBlock from "./components/contentful-content-blocks/CallToActionBlock";

export default async function HomePage() {
  const homePage = await getPageBySlug("home");

  let contentBlocks = generateContentBlocks(
    homePage.pageContentCollection.items,
  );

  return (
    <div>
      {homePage.heroImage?.url && (
        <div className="absolute right-0 top-0  h-[776px] w-full rounded-br-[100px] bg-light-shadow bg-scroll">
          <div className="relative h-full mix-blend-multiply">
            <ContentfulImage
              priority
              src={homePage.heroImage.url}
              alt="GCD Hero Image"
              className="absolute"
              fill
              style={{
                objectFit: "cover",
              }}
              sizes="100vw"
            />
            <div className="absolute h-full w-2/3 bg-gradient-to-r from-black"></div>
            <div className="absolute h-2/3 w-full bg-gradient-to-b from-black"></div>
          </div>
        </div>
      )}
      <section className="main-content relative flex h-[646px] items-center text-neutral lg:h-[656px]">
        <div>
          <h1 className="mb-5">
            Don&apos;t just <br /> build.Build better.
          </h1>
          <h4 className="max-w-[629px]">{homePage.subtitle}</h4>
        </div>
      </section>

      <main className="mt-[200px]">{contentBlocks}</main>

      {/* TODO: move this into contentful as a content type */}
      <CallToActionBlock />
    </div>
  );
}
