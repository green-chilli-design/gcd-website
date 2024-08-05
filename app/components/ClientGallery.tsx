import { cn } from "@/lib/utils";
import ClientLogo from "./ClientLogo";

export default function ClientGallery({
  clients,
  className,
}: {
  clients: any[];
  className?: any;
}) {
  return (
    <div className="main-content block">
      <div
        className={cn(
          "grid w-full grid-cols-1 gap-y-20 xs:grid-cols-2 md:grid-cols-3 lg:-mt-20 lg:grid-cols-6",
          className,
        )}
      >
        {clients.map((client) => (
          <div className="flex items-center justify-center" key={client.name}>
            {client.logo && <ClientLogo client={client} />}
          </div>
        ))}
      </div>
    </div>
  );
}
