"use client";

import ContentfulImage from "@/lib/contentful-image";
import { useEffect, useRef } from "react";
import { register } from "swiper/element/bundle";
import { SwiperOptions } from "swiper/types";
register();

export default function TeamGallery({ gcdTeam }: { gcdTeam: any }) {
  const swiperEl = document.querySelector("swiper-container");

  // swiper parameters
  const swiperParams: SwiperOptions = {
    slidesPerView: 2,
    breakpoints: {
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
    },
    loop: true,
    autoplay: {
      delay: 2000,
      pauseOnMouseEnter: true,
    },
  };

  useEffect(() => {
    if (swiperEl) {
      Object.assign(swiperEl, swiperParams);
      swiperEl.initialize();
    }
  }, [swiperEl]);

  return (
    <div className="xl:w-xl w-full">
      <swiper-container init="false">
        {gcdTeam?.map((teamMember: any) => (
          <swiper-slide
            key={teamMember.firstName + teamMember.lastName}
            class="h-[300px] w-[300px]"
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
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
}
