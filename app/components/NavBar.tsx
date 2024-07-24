"use client";

import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";
import GCDLogo from "./GCDLogo";
import { createContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useClientMediaQuery } from "@/lib/hooks/useClientMediaQuery";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export const NavBarScrolledContext = createContext(false);
export const IsMobileContext = createContext(false);

export default function NavBar() {
  const { resolvedTheme } = useTheme();
  const { theme } = resolveConfig(tailwindConfig);

  const [navBarScrolled, setNavBarScrolled] = useState(false);
  const isMobile = useClientMediaQuery(`(max-width: ${theme.screens.lg})`);

  // Set the logo color based on the theme and scroll position
  let logoSrc = "/gcd-logo-round-black.svg";
  if (resolvedTheme === "dark" || (navBarScrolled && !isMobile)) {
    logoSrc = "/gcd-logo-round-white.svg";
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setNavBarScrolled(window.scrollY >= 10);
    });
  });

  return (
    <NavBarScrolledContext.Provider value={navBarScrolled}>
      <IsMobileContext.Provider value={isMobile}>
        <header
          className={`z-10 w-full ${
            navBarScrolled && !isMobile
              ? "sticky-navbar-dark"
              : resolvedTheme === "dark"
                ? "sticky-navbar-dark"
                : "sticky-navbar"
          }`}
        >
          <nav className="main-content flex items-center justify-between py-5 lg:pb-5 lg:pt-[30px]">
            <GCDLogo
              className={"transition duration-500 hover:scale-110"}
              logoSrc={logoSrc}
            />
            <div>
              <NavMenu />
              <NavMenuMobile />
            </div>
          </nav>
        </header>
      </IsMobileContext.Provider>
    </NavBarScrolledContext.Provider>
  );
}
