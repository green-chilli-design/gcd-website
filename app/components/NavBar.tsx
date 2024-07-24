"use client";

import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";
import GCDLogo from "./GCDLogo";
import { cn } from "@/lib/utils";
import { createContext, useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useClientMediaQuery } from "@/lib/hooks/useClientMediaQuery";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export const NavBarContainerScrolledContext = createContext(false);
export const IsMobileContext = createContext(false);

export default function NavBar() {
  const { resolvedTheme } = useTheme();
  const { theme } = resolveConfig(tailwindConfig);

  const [navBarScrolled, setNavBarScrolled] = useState<boolean>(false);
  const [navBarContainerScrolled, setNavBarContainerScrolled] =
    useState<boolean>(false);
  const isMobile = useClientMediaQuery(`(max-width: ${theme.screens.lg})`);

  // Set the logo color based on the theme and scroll position
  let logoSrc = "/gcd-logo-round-black.svg";
  if (resolvedTheme === "dark") {
    logoSrc = "/gcd-logo-round-white.svg";
  }
  if (navBarContainerScrolled && !isMobile) {
    logoSrc = "/gcd-logo-square-white.svg";
  }

  // Get scroll position to apply sticky navbar
  const onScroll = useCallback(() => {
    const { scrollY } = window;
    setNavBarScrolled(scrollY > 0);
    setNavBarContainerScrolled(scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  useEffect(() => {});

  return (
    <IsMobileContext.Provider value={isMobile}>
      <NavBarContainerScrolledContext.Provider value={navBarContainerScrolled}>
        <header
          className={cn(
            "z-10 flex h-[150px] w-full items-center ",
            !isMobile &&
              navBarContainerScrolled &&
              (resolvedTheme === "dark"
                ? "sticky -top-[100px] bg-black"
                : "sticky-navbar-dark sticky -top-[100px]"),
            !isMobile &&
              !navBarContainerScrolled &&
              resolvedTheme !== "dark" &&
              "sticky-navbar sticky -top-[100px]",
            isMobile &&
              (resolvedTheme === "dark"
                ? "sticky top-0 bg-black"
                : "sticky top-0 bg-neutral"),
          )}
        >
          <nav
            className={cn(
              "main-content flex h-[150px] items-center justify-between",
            )}
          >
            <div
              className={cn(
                "flex h-[50px] w-full items-center justify-between",
                navBarScrolled && !isMobile && "sticky -top-[0px]",
              )}
            >
              <div className={"flex w-[90px] justify-center"}>
                <GCDLogo
                  className={"transition duration-500 hover:scale-110"}
                  logoSrc={logoSrc}
                  width={navBarContainerScrolled && !isMobile ? 72 : 90}
                  height={navBarContainerScrolled && !isMobile ? 72 : 90}
                />
              </div>
              <div>
                <NavMenu />
                <NavMenuMobile />
              </div>
            </div>
          </nav>
        </header>
      </NavBarContainerScrolledContext.Provider>
    </IsMobileContext.Provider>
  );
}
