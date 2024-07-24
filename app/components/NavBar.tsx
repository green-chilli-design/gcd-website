"use client";

import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";
import GCDLogo from "./GCDLogo";
import { createContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useClientMediaQuery } from "@/lib/hooks/useClientMediaQuery";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import { cn } from "@/lib/utils";

export const NavBarScrolledContext = createContext(false);
export const IsMobileContext = createContext(false);

export default function NavBar() {
  const { resolvedTheme } = useTheme();
  const { theme } = resolveConfig(tailwindConfig);

  const [navBarScrolled, setNavBarScrolled] = useState(false);
  const isMobile = useClientMediaQuery(`(max-width: ${theme.screens.lg})`);

  // Set the logo color based on the theme and scroll position
  let logoSrc = "/gcd-logo-round-black.svg";
  if (resolvedTheme === "dark") {
    logoSrc = "/gcd-logo-round-white.svg";
  }
  if (navBarScrolled && !isMobile) {
    logoSrc = "/gcd-logo-square-white.svg";
  }

  // Get scroll position to apply sticky navbar
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setNavBarScrolled(window.scrollY >= 52);
    });
  });

  return (
    <NavBarScrolledContext.Provider value={navBarScrolled}>
      <IsMobileContext.Provider value={isMobile}>
        <div
          className={cn(
            "h-[150px]",
            isMobile && "sticky top-0",
            navBarScrolled && !isMobile && "sticky top-0 ",
          )}
        >
          <header
            className={cn(
              "z-10 flex h-[150px] w-full py-5 lg:pb-5 lg:pt-[30px]",
              navBarScrolled && !isMobile
                ? "sticky-navbar-dark m-auto flex h-[50px] py-0 lg:pb-0 lg:pt-[0px]"
                : resolvedTheme === "dark"
                  ? "sticky-navbar-dark"
                  : "sticky-navbar",
            )}
          >
            <nav className={"main-content flex justify-between"}>
              <div className={"flex w-[90px] justify-center"}>
                <GCDLogo
                  className={"transition duration-500 hover:scale-110"}
                  logoSrc={logoSrc}
                  width={navBarScrolled && !isMobile ? 72 : 90}
                  height={navBarScrolled && !isMobile ? 72 : 90}
                />
              </div>
              <div className="flex items-center">
                <NavMenu />
                <NavMenuMobile />
              </div>
            </nav>
          </header>
        </div>
      </IsMobileContext.Provider>
    </NavBarScrolledContext.Provider>
  );
}
