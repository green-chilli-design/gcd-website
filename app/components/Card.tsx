import ContentfulMedia from "@/lib/contentful-media";
import Link from "next/link";

export default function Card({
  title,
  image,
  link,
}: {
  title: string;
  image: any;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="relative h-[440px] w-full max-w-[800px] cursor-pointer overflow-hidden rounded-br-[30px] rounded-tl-[30px] bg-black-80"
    >
      <div className="absolute h-full w-full transition duration-500 hover:scale-105">
        <ContentfulMedia
          src={image.url}
          alt={title}
          imageProps={{
            priority: true,
            fill: true,
            className: "object-cover",
            sizes: "(max-width: 320px) 90vw, (max-width: 1024px) 50vw, 33vw",
          }}
        />
        <div className="absolute bottom-0 h-2/3 w-full bg-gradient-to-t from-black"></div>
      </div>
      <div className="absolute bottom-0 flex w-full items-center justify-between px-5 pb-6 text-neutral">
        <h5>{title}</h5>
        <span className="material-icons-outlined icon-24 transition duration-500 hover:scale-125">
          arrow_forward
        </span>
      </div>
    </Link>
  );
}
