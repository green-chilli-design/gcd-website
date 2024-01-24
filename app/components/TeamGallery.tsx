"use client";

import ContentfulImage from "@/lib/contentful-image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper/modules";
import { AutoplayOptions } from "swiper/types";

export default function TeamGallery({ gcdTeam }: { gcdTeam: any }) {
  const swiperEl = document.querySelector("swiper-container");

  const autoplay: AutoplayOptions = {
    delay: 2000,
    pauseOnMouseEnter: true,
  };

  const breakpoints = {
    0: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
    1920: {
      slidesPerView: 6,
    },
  };

  return (
    <div className="h-[300px] w-full max-w-[1920px]">
      <Swiper
        loop={true}
        breakpoints={breakpoints}
        autoplay={autoplay}
        speed={3500}
        modules={[Autoplay]}
        className="h-full w-full"
      >
        {gcdTeam?.map((teamMember: any) => (
          <SwiperSlide key={teamMember.firstName + teamMember.lastName}>
            {teamMember.actionShot && (
              <div className="relative h-[300px] w-full">
                <ContentfulImage
                  src={teamMember.actionShot.url}
                  alt={teamMember.firstName}
                  fill={true}
                  style={{
                    objectFit: "cover",
                  }}
                  className="hover:opacity-0"
                  sizes="(max-width: 320px) 50vw, 320px"
                />
                <div className="absolute flex h-full w-full flex-col items-center justify-end bg-black p-8 text-black opacity-0 hover:opacity-100">
                  <ContentfulImage
                    src={teamMember.organisationIcon.url}
                    alt={teamMember.role}
                    width={teamMember.organisationIcon.width}
                    height={teamMember.organisationIcon.height}
                    className="mb-20"
                  />
                  <p className="text-sm text-white">{teamMember.firstName}</p>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
