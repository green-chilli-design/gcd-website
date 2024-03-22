import ClientLogo from "./ClientLogo";

export default function ClientGallery({ clients }: { clients: any[] }) {
  return (
    <div className="block">
      <div className="flex w-full flex-wrap items-center justify-center gap-20 lg:-mt-20">
        {clients.map((client) => (
          <div key={client.name}>
            {client.logo && <ClientLogo client={client} />}
          </div>
        ))}
      </div>
    </div>
  );
}
