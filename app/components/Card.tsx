import ContentfulImage from "@/lib/contentful-image";
import Link from "next/link";

export default function Card({
  title,
  image,
  link,
}: {
  title: string;
  image: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      key={title}
      className="relative h-[440px] w-[440px] cursor-pointer overflow-hidden rounded-br-[30px] rounded-tl-[30px] bg-black-80 mix-blend-multiply"
    >
      <ContentfulImage
        priority
        src={image}
        alt={title}
        className="absolute"
        width={440}
        height={440}
      />
      <div className="absolute bottom-0 h-2/3 w-full bg-gradient-to-t from-black"></div>
      <div className="absolute bottom-0 flex w-full items-center justify-between px-5 pb-6 text-neutral">
        <h5>{title}</h5>
        <span className="material-symbols-outlined icon-24 transition duration-500 hover:scale-125">
          arrow_forward
        </span>
      </div>
    </Link>
  );
}
