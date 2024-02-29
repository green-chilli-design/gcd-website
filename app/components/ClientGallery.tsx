"use client";

import ContentfulImage from "@/lib/contentful-image";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function ClientGallery({ clients }: { clients: any[] }) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="block">
      <div className="flex w-full flex-wrap items-center justify-center gap-20 lg:-mt-20">
        {clients.map((client) => (
          <div key={client.name}>
            {client.logo && (
              <Link href={client.url} target="_blank">
                {client.logoDarkMode && resolvedTheme === "dark" ? (
                  <ContentfulImage
                    src={client.logoDarkMode.url}
                    alt={client.name}
                    width={client.logoDarkMode.width}
                    height={client.logoDarkMode.height}
                  />
                ) : (
                  <ContentfulImage
                    src={client.logo.url}
                    alt={client.name}
                    width={client.logo.width}
                    height={client.logo.height}
                  />
                )}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
