import { getPageBySlug } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";
import Link from "next/link";

export default async function HomePage() {
  const { subtitle, pageContentCollection } = await getPageBySlug("home");

  let contentBlocks = generateContentBlocks(pageContentCollection.items);

  return (
    <div className="container mb-20">
      <section className="text-bold text-6xl md:text-8xl mt-5 md:mt-20">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg  from-green via-slate-700 bg-gradient-conic  to-slate-950 opacity-50 blur-3xl"></div>
          Don't just build. <br />
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

      <main>{contentBlocks}</main>
    </div>
  );
}
