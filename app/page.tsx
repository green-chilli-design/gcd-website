import { getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import ContentfulImage from "@/lib/contentful-image";

export default async function HomePage() {
  const { subtitle, pageContentCollection, heroImage } =
    await getPageBySlug("home");

  let contentBlocks = generateContentBlocks(pageContentCollection.items);

  return (
    <div className="gradient from-black">
      {heroImage?.url && (
        <div className="absolute right-0 top-0 z-0 h-[776px] w-full bg-scroll">
          <ContentfulImage
            priority
            src={heroImage.url}
            alt="GCD Hero Image"
            className="rounded-br-[30px]"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <section className="main-content relative z-10 flex h-[646px] items-center text-neutral lg:h-[656px]">
        <div>
          <h1 className="mb-5 leading-[84px]">
            Don't just <br /> build.Build better.
          </h1>
          <h4 className="max-w-[629px]">{subtitle}</h4>
        </div>
      </section>

      <main className="main-content">{contentBlocks}</main>
    </div>
  );
}
