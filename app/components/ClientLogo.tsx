"use client";
import ContentfulMedia from "@/lib/contentful-media";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function ClientLogo({ client }: { client: any }) {
  const { resolvedTheme } = useTheme();
  const { url, width, height } =
    client.logoDarkMode && resolvedTheme === "dark"
      ? client.logoDarkMode
      : client.logo;

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
