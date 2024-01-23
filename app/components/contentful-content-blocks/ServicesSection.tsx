import { getCategoryByName } from "@/lib/api";
import ContentBlock from "./ContentBlock";
import ServiceList from "../ServiceList";

export interface Category {
  name: string;
  subCategoriesCollection: {
    items: SubCategoryItem[];
  };
}

export interface SubCategoryItem {
  name: string;
  description: string;
  coverImage: {
    url: string;
  };
}

export default async function ServicesSection({
  contentBlock,
}: {
  contentBlock: any;
}) {
  const services: Category = await getCategoryByName("Services");

  return (
    <section className="rounded-br-[30px] rounded-tl-[30px] bg-white-120 pb-[100px] dark:bg-black-80">
      <ContentBlock contentBlock={contentBlock} />
      <ServiceList services={services} />
    </section>
  );
}
