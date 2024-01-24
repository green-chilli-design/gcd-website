"use client";

import { useState } from "react";
import ContentfulImage from "@/lib/contentful-image";
import {
  Category,
  SubCategoryItem,
} from "./contentful-content-blocks/ServicesSection";

function ServicePreview({ service }: { service: SubCategoryItem }) {
  return (
    service && (
      <div className="flex w-full flex-col">
        {service.coverImage?.url && (
          <ContentfulImage
            src={service.coverImage.url}
            alt={service.name}
            width={440}
            height={440}
            className="mb-5 rounded-br-[30px] rounded-tl-[30px]"
          />
        )}

        <h5 className="mb-3">{service.name}</h5>
        <p>{service.description}</p>
      </div>
    )
  );
}

export default function ServiceList({ services }: { services: Category }) {
  const [selectedService, setSelectedService] = useState<SubCategoryItem>(
    services?.subCategoriesCollection?.items[0],
  );
  const [hovered, setHovered] = useState(false);

  return (
    <div className="main-content flex w-full flex-wrap items-start justify-center gap-24 sm:flex-nowrap">
      <ul className="w-full">
        {services?.subCategoriesCollection?.items.map((category: any) => (
          <li
            onMouseEnter={() => {
              setSelectedService(category), setHovered(true);
            }}
            key={category.name}
            className={`flex items-center justify-between border-b-2 hover:border-green dark:hover:border-green ${
              hovered && selectedService.name === category.name
                ? "border-green"
                : "border-black dark:border-neutral"
            }`}
          >
            <h5>{category.name}</h5>
            {hovered && selectedService.name === category.name ? (
              <span className="icon-24 material-symbols-outlined">
                arrow_outward
              </span>
            ) : (
              <span className="icon-24 material-symbols-outlined">
                arrow_forward
              </span>
            )}
          </li>
        ))}
      </ul>

      {selectedService && <ServicePreview service={selectedService} />}
    </div>
  );
}