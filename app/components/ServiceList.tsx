"use client";

import { useState } from "react";
import ContentfulImage from "@/lib/contentful-image";

function ServicePreview({ service }: { service: any }) {
  return (
    service && (
      <div className="flex w-full flex-col">
        {/* TODO: Link to service page (/services/:slug) - not done yet for MVP */}
        {service.coverImage?.url && (
          <ContentfulImage
            src={service.coverImage.url}
            alt={service.title}
            width={522}
            height={300}
            className="mb-5 rounded-br-[30px] rounded-tl-[30px]"
          />
        )}

        <h5 className="mb-3">{service.title}</h5>
        <p>{service.summary}</p>
      </div>
    )
  );
}

export default function ServiceList({ services }: { services: any }) {
  const [selectedService, setSelectedService] = useState<any>(services[0]);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-24 px-[18px] sm:flex-nowrap md:px-[80px] lg:px-[10rem] xl:px-[20%]">
      <ul className="w-full">
        {services?.map((service: any) => (
          <li
            onMouseEnter={() => {
              setSelectedService(service), setHovered(true);
            }}
            key={service.title}
            className={`flex items-center justify-between border-b-2 p-[0.8rem] hover:border-green dark:hover:border-green ${
              hovered && selectedService.title === service.title
                ? "border-green"
                : "border-black dark:border-neutral"
            }`}
          >
            <h5>{service.title}</h5>
            {hovered && selectedService.title === service.title ? (
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
