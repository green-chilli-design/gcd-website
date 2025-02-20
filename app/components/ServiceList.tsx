"use client";

import ContentfulMedia from "@/lib/contentful-media";
import Link from "next/link";
import { useState } from "react";

function ServicePreview({ service }: { service: any }) {
  return (
    <div>
      {/* TODO: Link to service page (/services/:slug) - not done yet for MVP */}

      {service.coverImage?.url && (
        <ContentfulMedia
          src={service.coverImage.url}
          alt={service.title}
          imageProps={{
            width: 522,
            height: 300,
            className:
              "mt-3 md:mt-0 mb-5 h-[300px] rounded-br-[30px] rounded-tl-[30px] object-cover w-full md:w-[522px] md:h-[300px]",
          }}
        />
      )}

      <h5 className="mb-3 hidden md:block">{service.title}</h5>
      <p>{service.summary}</p>
    </div>
  );
}

export default function ServiceList({ services }: { services: any }) {
  const [selectedService, setSelectedService] = useState<any>(services[0]);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-24 px-[18px] md:flex-nowrap md:px-[80px] lg:px-[10rem] xl:px-[20%]">
      <ul className="w-full">
        {services?.map((service: any) => (
          <li
            onMouseEnter={() => {
              setSelectedService(service), setHovered(true);
            }}
            key={service.title}
            className={`items-center justify-between border-b-2 py-[0.8rem] hover:border-green dark:hover:border-green md:flex md:p-[0.8rem] ${
              hovered && selectedService.title === service.title
                ? "md:border-green"
                : "border-black dark:border-neutral"
            }`}
          >
            <Link href={service?.servicePage?.slug || "#services"}>
              <div
                className={`mb-2 flex w-full justify-between md:mb-0 ${
                  hovered && selectedService.title === service.title
                    ? "border-b border-green text-green md:border-none"
                    : "border-none"
                }`}
              >
                <h5 className="pb-[0.8rem] md:pb-0">{service.title}</h5>
                {hovered && selectedService.title === service.title ? (
                  <span className="icon-24 material-icons-outlined">
                    arrow_outward
                  </span>
                ) : (
                  <span className="icon-24 material-icons-outlined">
                    arrow_forward
                  </span>
                )}
              </div>

              {selectedService && selectedService.title === service.title && (
                <div className="flex w-full flex-col md:hidden">
                  <ServicePreview service={selectedService} />
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {selectedService && (
        <div className="hidden w-full flex-col md:flex">
          <ServicePreview service={selectedService} />
          {selectedService?.servicePage?.slug && (
            <Link href={selectedService?.servicePage?.slug}>
              <button className="btn-primary mt-5 self-end justify-self-end text-right  hover:text-green hover:underline">
                Learn More
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
