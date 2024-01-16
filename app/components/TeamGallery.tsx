"use client";

import ContentfulImage from "@/lib/contentful-image";
import { register } from "swiper/element/bundle";
register();

export default function TeamGallery({ gcdTeam }: { gcdTeam: any }) {
  return (
    <swiper-container
      slides-per-view="4"
      speed="500"
      loop="true"
      autoplay="true"
      autoplay-delay="2000"
      autoplay-pause-on-mouse-enter="true"
    >
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
  );
}
