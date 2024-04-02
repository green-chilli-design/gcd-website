import ContentfulMedia from "@/lib/contentful-media";
import Link from "next/link";

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
    <ContentfulMedia
      src={url}
      alt={`Cover Image for ${title}`}
      imageProps={{
        priority: true,
        fill: true,
        className: "object-cover",
        sizes: "(max-width: 320px) 90vw, 80vw",
      }}
    />
  );

  return (
    <div className="relative h-[500px] overflow-hidden rounded-br-[100px] rounded-tl-[100px] sm:mx-0">
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
