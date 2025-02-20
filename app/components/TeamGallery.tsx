"use client";

import ContentfulMedia from "@/lib/contentful-media";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Autoplay } from "swiper/modules";
import { AutoplayOptions, SwiperOptions } from "swiper/types";

export default function TeamGallery({ gcdTeam }: { gcdTeam: any }) {
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
    2560: {
      slidesPerView: 7,
    },
    3840: {
      slidesPerView: 8,
    },
  } as const satisfies { [width: number]: SwiperOptions };

  return (
    <div className="h-[300px] w-full lg:-mt-20 lg:h-[350px] xl:h-[400px]">
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
              <div className="relative h-full w-full">
                <ContentfulMedia
                  src={teamMember.actionShot.url}
                  alt={teamMember.firstName}
                  imageProps={{
                    fill: true,
                    className: "hover:opacity-0 object-cover",
                    sizes: "(max-width: 320px) 50vw, 320px",
                  }}
                />
                <div className="absolute flex h-full w-full flex-col items-center justify-end bg-black p-8 text-black opacity-0 hover:opacity-100">
                  <ContentfulMedia
                    src={teamMember.organisationIcon.url}
                    alt={teamMember.role}
                    imageProps={{
                      width: teamMember.organisationIcon.width,
                      height: teamMember.organisationIcon.height,
                      className: "mb-20",
                    }}
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
