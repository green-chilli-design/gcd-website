import ClientLogo from "./ClientLogo";

export default function ClientGallery({ clients }: { clients: any[] }) {
  return (
    <div className="main-content block">
      <div className="grid w-full grid-cols-1 gap-y-20 xs:grid-cols-2 md:grid-cols-3 lg:-mt-20 lg:grid-cols-6">
        {clients.map((client) => (
          <div className="flex items-center justify-center" key={client.name}>
            {client.logo && <ClientLogo client={client} />}
          </div>
        ))}
      </div>
    </div>
  );
}
