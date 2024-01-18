import ContentfulImage from "@/lib/contentful-image";
import Link from "next/link";

export default function ClientGallery({ clients }: { clients: any[] }) {
  return (
    <div className="block">
      <div className="flex w-full flex-wrap items-center justify-center gap-20">
        {clients.map((client) => (
          <div key={client.name}>
            {client.logo && (
              <Link href={client.url} target="_blank">
                <ContentfulImage
                  src={client.logo.url}
                  alt={client.name}
                  width={client.logo.width}
                  height={client.logo.height}
                />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
