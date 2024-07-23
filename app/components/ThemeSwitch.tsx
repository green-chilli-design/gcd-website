"use client";

import { useTheme } from "next-themes";
import { useContext, useState } from "react";
import { DarkNavBarContext } from "./NavBar";

interface ThemeSwitchProps {
  isMobile?: boolean;
}

export default function ThemeSwitch({ isMobile = false }: ThemeSwitchProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [effect, setEffect] = useState(false);
  const darkNavBar = useContext(DarkNavBarContext);
  let iconColor =
    resolvedTheme === "dark" || darkNavBar ? "#F7F4F3" : "#080708";
  if (resolvedTheme === "light" && isMobile) {
    iconColor = "#080708";
  }
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        setEffect(true);
      }}
      className={`${
        effect &&
        (resolvedTheme === "dark" ? "animate-spin-left" : "animate-spin-right")
      } rotate-180 cursor-pointer transition duration-500`}
      onAnimationEnd={() => setEffect(false)}
    >
      <g id="brightness_1">
        <mask
          id="mask0_323_384"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="24"
          height="24"
        >
          <rect id="Bounding box" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_323_384)">
          <path
            id="brightness_1_2"
            d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
            fill={iconColor}
          />
          <path
            id="Ellipse 28"
            d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2L12 12L12 22Z"
            fill={iconColor}
          />
        </g>
      </g>
    </svg>
  );
}
