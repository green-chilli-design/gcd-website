import { getAllServices } from "@/lib/api";
import ServiceList from "../ServiceList";
import ContentBlock from "./ContentBlock";

export default async function ServicesSection({
  contentBlock,
}: {
  contentBlock: any;
}) {
  const services = await getAllServices();

  return (
    <section
      id="services"
      className="rounded-br-[100px] rounded-tl-[100px] bg-white-120 pb-[100px] dark:bg-black-80"
    >
      <ContentBlock contentBlock={contentBlock} />
      <ServiceList services={services} />
    </section>
  );
}
