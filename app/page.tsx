import { getPageBySlug } from "@/lib/api";
import { Markdown } from "@/lib/markdown";
import Link from "next/link";

/**
 * TODO: This should be turned into some global re-usable component factory
 *
 * This function generates the content blocks for the home page
 *
 * Depending on the type of content block, it will render a different component (TODO)
 *
 * @param contentBody
 * @returns A list of content blocks
 */
function generateContentBlocks(contentBody: any[]) {
  return Object.entries(contentBody).map(([key, value]) => {
    switch (value.__typename) {
      case "ContentBlock":
        return (
          <section
            key={value}
            className="even:rounded-2xl even:shadow-md even:border even:border-green even:shadow-green my-5 p-16 even:hover:shadow-lg even:transition-all even:duration-500 even:ease-in-out even:bg-gradient-to-tr even:from-slate-950 even:via-slate-900 even:to-slate-950"
          >
            {value.heading && (
              <div className="text-4xl font-medium mb-5">{value.heading}</div>
            )}
            {value.subHeading && (
              <div className="text-xl font-medium mb-2">{value.subHeading}</div>
            )}
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

export default async function HomePage() {
  const { subtitle, pageContentCollection } = await getPageBySlug("home");

  let contentBlocks = generateContentBlocks(pageContentCollection.items);

  return (
    <article className="mb-20">
      <section className="text-bold text-6xl md:text-8xl mt-5 md:mt-20">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg  from-green via-slate-700 bg-gradient-conic  to-slate-950 opacity-50 blur-3xl"></div>
          Don’t just build. <br />
          Build better.
        </div>
      </section>
      <hr className="w-1/3 mt-20 mb-5" />
      <section className="flex flex-row justify-between">
        <div className="w-1/3 text-2xl">{subtitle}</div>
        <Link href="/contact">
          <div className="bg-green w-36 h-36 flex justify-center items-center  rounded-full text-black hover:scale-110 hover:bg-white transition duration-300">
            Get in touch
          </div>
        </Link>
      </section>

      <section>
        <h1>H1</h1>
        <h2>H2</h2>
        <h3>H3</h3>
        <h4>H4</h4>
        <h5>H5</h5>
        <p>Paragraph</p>
        <p className="small">Paragraph small</p>
        <label className="label">label</label>
        <label className="label small">small label</label>
        <div>just a div</div>
      </section>

      <main>{contentBlocks}</main>
    </article>
  );
}
