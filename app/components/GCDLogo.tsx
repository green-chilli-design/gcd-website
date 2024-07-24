"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

interface GCDLogoProps {
  className?: string;
  logoSrc?: string;
}

export default function GCDLogo({ className = "", logoSrc }: GCDLogoProps) {
  const { resolvedTheme } = useTheme();

  if (!logoSrc) {
    logoSrc = "/gcd-logo-round-black.svg";
    if (resolvedTheme === "dark") {
      logoSrc = "/gcd-logo-round-white.svg";
    }
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
