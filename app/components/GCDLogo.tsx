"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

interface GCDLogoProps {
  className?: string;
  logoSrc?: string;
  width?: number;
  height?: number;
}

export default function GCDLogo({
  className = "",
  logoSrc,
  width = 90,
  height = 90,
}: GCDLogoProps) {
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
          width={width}
          height={height}
          className={className}
        />
      </Link>
    </div>
  );
}
