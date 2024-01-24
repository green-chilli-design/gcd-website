import Image from "next/image";
import backgroundImage from "@/public/images/home-bg.png";
import Link from "next/link";

export default function CallToActionBlock() {
  return (
    <section className="relative h-[830px] w-full bg-white">
      <Image
        alt="Background Image"
        src={backgroundImage}
        placeholder="blur"
        quality={100}
        sizes="100vw"
        fill={true}
        objectFit="cover"
        className="mix-blend-difference dark:mix-blend-normal"
      />
      <div className="main-content absolute my-[200px] dark:text-black">
        <div className="flex w-full flex-col rounded-br-[30px] rounded-tl-[30px] bg-neutral px-5 py-16 lg:px-28 lg:py-20">
          <h1>Ready to build better?</h1>
          <h3 className="my-5 max-w-[850px]">
            If you value long-term partnership, transparency and joint success,
            drop us a line.
          </h3>
          <Link
            href={"/contact"}
            className="btn green flex w-44 items-center justify-center dark:text-black"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
