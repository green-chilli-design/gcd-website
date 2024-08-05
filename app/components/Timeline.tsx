"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import timeline from "@/public/images/timeline.svg";
import darkTimeline from "@/public/images/timeline-dark.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

// TODO: Migrate this to Contentful
function Timeline() {
  gsap.registerPlugin(ScrollTrigger);

  const { resolvedTheme } = useTheme();
  useGSAP(() => {
    // When the #timeline-img-container is scrolled into view, animate the timeline image by starting it to scroll to the right
    gsap.to("#timeline-img-container", {
      scrollTrigger: {
        trigger: "#timeline-container",
        start: "-80% top",
        end: "bottom 200%",
        scrub: false,
        // markers: true,
        toggleActions: "play none resume reset",
      },
      x: () =>
        -(document.querySelector("#timeline-img-container") as HTMLElement)
          .offsetWidth + window.innerWidth,
      duration: 40,
    });
  }, []);

  return (
    <div
      id="timeline-container"
      className="flex w-full flex-col justify-center gap-10   text-center"
    >
      <h2>Our Our End-to-End Mobile App Development Service</h2>
      <h3 className=" uppercase text-dark-grey">GCD END - TO - END PROCESS</h3>
      <div id="overflow-wrapper" className=" overflow-x-clip">
        <div
          id="timeline-img-container"
          className="relative h-[200px] w-full min-w-[4000px] md:h-[300px] md:min-w-[6000px]"
        >
          <Image
            src={resolvedTheme === "dark" ? darkTimeline : timeline}
            alt="GCD End-to-End Process"
            fill={true}
          />
        </div>
      </div>
      <div
        className="main-content flex flex-col justify-around gap-12 text-left md:flex-row md:gap-10 lg:mt-10"
        id="3-cols"
      >
        <div className=" flex-1 md:w-1/3">
          <h2 className="uppercase">Strong Stakeholder Alignment</h2>
          <p>
            Your feedback is integrated throughout the design to clickable
            wireframes so everyone knows what they’re getting before development
            even starts.
          </p>
        </div>
        <div className=" flex-1 md:w-1/3">
          <h2 className="uppercase">User-Centered Design</h2>
          <p>
            User and stakeholder input guides design refinements at every stage,
            ensuring high levels of satisfaction.
          </p>
        </div>
        <div className=" flex-1 md:w-1/3">
          <h2 className="uppercase">Drastically Reduce Risk</h2>
          <p>
            Iterative feedback loops catch issues early, saving both time and
            money efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
