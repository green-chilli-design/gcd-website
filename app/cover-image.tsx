import ContentfulImage from "@/lib/contentful-image";
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
    <ContentfulImage
      alt={`Cover Image for ${title}`}
      priority
      src={url}
      fill={true}
      style={{
        objectFit: "cover",
      }}
      sizes="(max-width: 320px) 90vw, 80vw"
    />
  );

  return (
    <div className="relative h-[500px] overflow-hidden rounded-br-[30px] rounded-tl-[30px] sm:mx-0">
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
