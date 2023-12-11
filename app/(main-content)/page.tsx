import { getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import Link from "next/link";

export default async function HomePage() {
  const { subtitle, pageContentCollection } = await getPageBySlug("home");

  let contentBlocks = generateContentBlocks(pageContentCollection.items);

  return (
    <div className="main-content mb-20">
      <section className="text-bold mt-5 text-6xl md:mt-20 md:text-8xl">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg  bg-gradient-conic from-green via-slate-700  to-slate-950 opacity-50 blur-3xl"></div>
          Don't just build. <br />
          Build better.
        </div>
      </section>
      <hr className="mb-5 mt-20 w-1/3" />
      <section className="flex flex-row justify-between">
        <div className="w-1/3 text-2xl">{subtitle}</div>
        <Link href="/contact">
          <div className="flex h-36 w-36 items-center justify-center rounded-full  bg-green text-black transition duration-300 hover:scale-110 hover:bg-white">
            Get in touch
          </div>
        </Link>
      </section>

      <main>{contentBlocks}</main>
    </div>
  );
}
