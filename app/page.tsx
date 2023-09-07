import { getPageBySlug } from "@/lib/api";
import Link from "next/link";

export default async function HomePage({
  children,
}: {
  children: React.ReactNode;
}) {
  const { title, slug, description, pageContentCollection } =
    await getPageBySlug("home");

  console.log(JSON.stringify(pageContentCollection.items, null, 2));

  return (
    <article className="mb-20">
      <section className="text-bold text-6xl md:text-8xl mt-5 md:mt-20">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg  from-gcd-green via-slate-700 bg-gradient-conic  to-slate-950 opacity-50 blur-3xl"></div>
          Don’t just build. <br />
          Build better.
        </div>
      </section>
      <hr className="w-1/3 mt-20 mb-5" />
      <section className="flex flex-row justify-between">
        <div className="w-1/3 text-2xl">
          Digital Strategy & Software Development to Drive Your Business
          Success.
        </div>
        <Link href="/contact">
          <div className="bg-gcd-green w-36 h-36 flex justify-center items-center  rounded-full text-black hover:scale-110 hover:bg-white transition duration-300">
            Get in touch
          </div>
        </Link>
      </section>
    </article>
  );
}
