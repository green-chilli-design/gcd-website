import ContentfulImage from "@/lib/contentful-image";
import Link from "next/link";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CoverImage({
  title,
  url,
  path,
  slug,
}: {
  title: string;
  url: string;
  path?: string;
  slug?: string;
}) {
  const image = (
    <ContentfulImage
      alt={`Cover Image for ${title}`}
      priority
      width={1000}
      height={500}
      className={"rounded-br-[30px] rounded-tl-[30px]"}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`${path}/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
