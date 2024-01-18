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
        modules={[Autoplay]}
        className="h-full w-full"
      >
        {gcdTeam?.map((teamMember: any) => (
          <SwiperSlide
            key={teamMember.firstName + teamMember.lastName}
            className="h-[300px] w-[300px]"
          >
            {teamMember.actionShot && (
              <ContentfulImage
                priority
                src={teamMember.actionShot.url}
                alt={teamMember.firstName}
                style={{
                  objectFit: "cover",
                }}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
