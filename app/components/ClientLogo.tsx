import ContentfulMedia from "@/lib/contentful-media";
import Link from "next/link";

export default function ClientLogo({ client }: { client: any }) {
  let { url, width, height } = client.logo;

  // Restrict the width of the image to 150px
  if (width > 150) {
    width = 150;
  }

  return (
    url && (
      <Link href={client.url} target="_blank">
        <ContentfulMedia
          src={url}
          alt={client.name}
          imageProps={{ width, height }}
        />
      </Link>
    )
  );
}
