"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useContext } from "react";
import { DarkNavBarContext } from "./NavBar";

interface GCDLogoProps {
  className?: string;
}

export default function GCDLogo({ className = "" }: GCDLogoProps) {
  const { resolvedTheme } = useTheme();
  const darkNavBar = useContext(DarkNavBarContext);

  let logoSrc = "/gcd-logo-round-black.svg";
  if (resolvedTheme === "dark" || darkNavBar) {
    logoSrc = "/gcd-logo-round-white.svg";
  }

  return (
    <div className="flex items-center">
      <Link href="/">
        <Image
          src={logoSrc}
          alt="Green Chilli Design Logo"
          width="80"
          height="80"
          className={className}
        />
      </Link>
    </div>
  );
}
