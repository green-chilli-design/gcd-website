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
    <div className="block">
      <div
        className={cn(
          "flex w-full flex-wrap items-center justify-center gap-20 lg:-mt-20",
          className,
        )}
      >
        {clients.map((client) => (
          <div key={client.name}>
            {client.logo && <ClientLogo client={client} />}
          </div>
        ))}
      </div>
    </div>
  );
}
