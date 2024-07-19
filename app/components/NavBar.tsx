"use client";

import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";
import GCDLogo from "./GCDLogo";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function NavBar() {
  const { resolvedTheme } = useTheme();

  const [darkNavBar, setDarkNavBar] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setDarkNavBar(window.scrollY > 10);
    });
  });

  return (
    <header
      className={`z-10 w-full ${
        darkNavBar
          ? "sticky-navbar-dark"
          : resolvedTheme === "dark"
            ? "sticky-navbar-dark"
            : "sticky-navbar"
      }`}
    >
      <nav className="main-content flex items-center justify-between py-5 lg:pb-5 lg:pt-[30px]">
        <GCDLogo
          className={"transition duration-500 hover:scale-110"}
          darkNavBar={darkNavBar}
        />
        <div>
          <NavMenu darkNavBar={darkNavBar} />
          <NavMenuMobile darkNavBar={darkNavBar} />
        </div>
      </nav>
    </header>
  );
}
