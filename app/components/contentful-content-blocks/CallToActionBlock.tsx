import Link from "next/link";

// TODO: Make this a proper content block in Contentful
export default function CallToActionBlock() {
  return (
    <section className="relative h-[830px] w-full bg-white dark:bg-black">
      <div className="main-content absolute my-[200px]">
        <div className="flex w-full flex-col rounded-br-[30px] rounded-tl-[30px] bg-black px-5 py-16 text-neutral dark:bg-neutral dark:text-black lg:px-28 lg:py-20">
          <h1>Ready to build better?</h1>
          <h3 className="my-5 max-w-[850px]">
            If you value long-term partnership, transparency and joint success,
            drop us a line.
          </h3>
          <Link
            href={"/contact"}
            className="btn green flex w-32 items-center justify-center text-black"
          >
            Let&#39;s Talk
          </Link>
        </div>
      </div>
    </section>
  );
}
