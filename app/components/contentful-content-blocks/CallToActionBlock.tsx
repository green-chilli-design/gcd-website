import Link from "next/link";

interface CallToActionBlockProps {
  mobileVariant?: boolean;
}
// TODO: Make this a proper content block in Contentful
export default function CallToActionBlock({
  mobileVariant,
}: CallToActionBlockProps) {
  return (
    <section className="relative h-[830px] w-full">
      <div
        className={`main-content absolute ${!mobileVariant && "my-[200px]"}`}
      >
        <div className="flex w-full flex-col rounded-br-[30px] rounded-tl-[30px] bg-black px-5 py-16 text-neutral dark:bg-neutral dark:text-black lg:px-28 lg:py-20">
          <h1 className="max-md:text-8xl">
            {mobileVariant
              ? "Looking for Mobile App Development Services?"
              : "Ready to build better?"}
          </h1>
          <h3 className="my-5 max-w-[850px]">
            {mobileVariant
              ? "Before we start, we would like to better understand your needs. Tell us more about your project and then we can  schedule a free estimation call."
              : "If you value long-term partnership, transparency and joint success, drop us a line."}
          </h3>
          <Link
            href={"/contact"}
            className="btn green flex w-fit items-center justify-center px-5 text-black"
          >
            {mobileVariant ? "Tell Us About Your App" : "Let's Talk"}
          </Link>
        </div>
      </div>
    </section>
  );
}
