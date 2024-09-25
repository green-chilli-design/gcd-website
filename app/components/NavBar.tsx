"use client";

import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";
import GCDLogo from "./GCDLogo";
import { cn } from "@/lib/utils";
import { createContext, useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useClientMediaQuery } from "@/lib/hooks/useClientMediaQuery";

export const NavBarContainerScrolledContext = createContext(false);
export const IsMobileContext = createContext(false);

export default function NavBar() {
  const { resolvedTheme } = useTheme();

  const [navBarScrolled, setNavBarScrolled] = useState<boolean>(false);
  const [navBarContainerScrolled, setNavBarContainerScrolled] =
    useState<boolean>(false);
  const [animateStickyNav, setAnimateStickyNav] = useState<boolean>(false);

  const isMobile = useClientMediaQuery(`(max-width: 1024px)`);
  const headerEl = document.querySelector("#header");

  /**
   * Set the logo color based on the theme and scroll position
   */
  let logoSrc = "/gcd-logo-round-black.svg";
  if (resolvedTheme === "dark") {
    logoSrc = "/gcd-logo-round-white.svg";
  }
  if (navBarContainerScrolled && !isMobile) {
    logoSrc = "/gcd-logo-white-text.svg";
  }

  /**
   * Get scroll position to apply sticky navbar
   */
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

  /**
   * Only animate sticky nav transition when scrolling; disable on refresh or screen size change
   */
  useEffect(() => {
    // When scrolling, animate the sticky nav animation
    if (headerEl?.classList.contains("sticky-navbar-dark")) {
      setAnimateStickyNav(true);
    }

    // When changing screen size, disable sticky nav animation
    if (isMobile) {
      setAnimateStickyNav(false);
    }
  }, [headerEl?.classList, isMobile]);

  return (
    <IsMobileContext.Provider value={isMobile}>
      <NavBarContainerScrolledContext.Provider value={navBarContainerScrolled}>
        <header
          id="header"
          className={cn(
            "z-10 flex h-[94.77px] w-full items-center lg:h-[150px] ",
            !isMobile &&
              navBarContainerScrolled &&
              (resolvedTheme === "dark"
                ? "sticky -top-[100px] bg-black"
                : "sticky-navbar-dark sticky -top-[100px]"),
            !isMobile &&
              !navBarContainerScrolled &&
              resolvedTheme !== "dark" &&
              (animateStickyNav
                ? "sticky-navbar sticky -top-[100px]"
                : "sticky -top-[100px] bg-neutral"),
            isMobile &&
              (resolvedTheme === "dark"
                ? "sticky top-0 bg-black"
                : "sticky top-0 bg-neutral"),
          )}
        >
          <nav
            className={cn(
              "main-content flex h-[94.77px] items-center justify-between lg:h-[150px]",
            )}
          >
            <div
              className={cn(
                "flex h-[50px] w-full items-center justify-between",
                navBarScrolled && !isMobile && "sticky -top-[0px]",
              )}
            >
              <div
                className={cn(
                  "flex w-[90px]",
                  navBarContainerScrolled && !isMobile && "ps-[10px]",
                )}
              >
                <GCDLogo
                  className={cn(
                    "transition duration-500 hover:scale-110",
                    isMobile && "w-[62.77px]",
                  )}
                  logoSrc={logoSrc}
                  width={navBarContainerScrolled && !isMobile ? 72 : undefined} // Pass undfined to use the default value in GCDLogo component
                  height={navBarContainerScrolled && !isMobile ? 72 : undefined} // Pass undfined to use the default value in GCDLogo component
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
