"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function ReactNative() {
  const { resolvedTheme } = useTheme();
  const colour = resolvedTheme === "dark" ? "#F7F4F3" : "#0E0F0E";
  const background = "/images/framework.png";

  return (
    <div className="mb-[120px]">
      <section className="relative mb-[120px] flex w-full items-center">
        <div className="main-content absolute z-10 text-neutral">
          <h1 className="max-w-[847px]">
            Building mobile apps in the React Native framework
          </h1>
        </div>
        <div className="relative h-[430px] w-full">
          <Image
            priority
            src={background}
            fill={true}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            sizes="100vw"
            alt="React Native Framework"
            className="rounded-br-[100px] rounded-tl-[100px] mix-blend-darken dark:mix-blend-lighten"
          />
        </div>
      </section>
      <section className="main-content">
        <h2 className="mx-auto mb-14 max-w-[630px] text-center">
          React Native mobile apps offer multiple advantages
        </h2>
        <div className="grid grid-cols-1 justify-items-center gap-20 md:grid-cols-3">
          <div className="flex max-w-[374px] flex-col items-center text-center md:items-start md:text-left">
            <svg
              width="162"
              height="102"
              viewBox="0 0 162 102"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-14"
            >
              <g id="Group 29">
                <circle
                  id="Ellipse 1"
                  cx="51"
                  cy="51"
                  r="50.5"
                  stroke={colour}
                />
                <circle
                  id="Ellipse 2"
                  cx="110.87"
                  cy="51"
                  r="50.5"
                  stroke={colour}
                />
              </g>
            </svg>
            <h5 className="mb-5">Cross-Platform Compatibility</h5>
            <p>
              React Native allows our developers to build apps that work
              seamlessly on both iOS and Android devices, reducing the need to
              create separate codebases for each platform.
            </p>
          </div>
          <div className="flex max-w-[374px] flex-col items-center text-center md:items-start md:text-left">
            <svg
              width="172"
              height="102"
              viewBox="0 0 172 102"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-14"
            >
              <line
                x1="25.2002"
                y1="27.5908"
                x2="82.4729"
                y2="27.5908"
                stroke={colour}
              />
              <line y1="50.5" x2="57.2727" y2="50.5" stroke={colour} />
              <line
                x1="28.6362"
                y1="73.4092"
                x2="85.909"
                y2="73.4092"
                stroke={colour}
              />
              <path
                d="M152.618 71.0454L170.945 51L152.618 30.9545"
                stroke={colour}
              />
              <path
                d="M110.236 71.0454L91.9091 51L110.236 30.9545"
                stroke={colour}
              />
              <path d="M117.109 82.5L141.164 19.5" stroke={colour} />
            </svg>
            <h5 className="mb-5">30% - 40% Faster development</h5>
            <p>
              Using a single codebase saves development time and resources
              compared to building separate apps for each platform.
            </p>
          </div>
          <div className="flex max-w-[374px] flex-col items-center text-center md:items-start md:text-left">
            <svg
              width="122"
              height="100"
              viewBox="0 0 122 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-14"
            >
              <line x1="0.5" y1="100" x2="0.5" y2="70" stroke={colour} />
              <line x1="40.5" y1="100" x2="40.5" y2="50" stroke={colour} />
              <line x1="80.5" y1="100" x2="80.5" y2="20" stroke={colour} />
              <line x1="120.5" y1="100" x2="120.5" stroke={colour} />
            </svg>
            <h5 className="mb-5">Improved performance</h5>
            <p>
              React Native runs faster and is more responsive to user inputs
              than native apps.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
