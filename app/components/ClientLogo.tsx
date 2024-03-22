"use client";
import ContentfulImage from "@/lib/contentful-image";
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
        <ContentfulImage
          src={url}
          alt={client.name}
          width={width}
          height={height}
        />
      </Link>
    )
  );
}
