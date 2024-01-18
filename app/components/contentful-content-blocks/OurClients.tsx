import { getAllClients } from "@/lib/api";
import ContentBlock from "./ContentBlock";
import ClientGallery from "../ClientGallery";

export default async function OurClients({
  contentBlock,
}: {
  contentBlock: any;
}) {
  const clients = await getAllClients();

  return (
    <section className="mb-20 flex flex-col items-center">
      <ContentBlock contentBlock={contentBlock} />
      <ClientGallery clients={clients} />
    </section>
  );
}
