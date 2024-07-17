import ContentfulMedia from "@/lib/contentful-media";
import Link from "next/link";

export default function ClientLogo({ client }: { client: any }) {
  const { url, width, height } = client.logo;

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
