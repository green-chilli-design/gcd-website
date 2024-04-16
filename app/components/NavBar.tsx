"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";

export default function NavBar() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  let logoSrc = "/gcd-logo-round-black.svg";
  if (resolvedTheme === "dark") {
    logoSrc = "/gcd-logo-round-white.svg";
  }

  return (
    <header className="z-10 w-full">
      <nav className="main-content flex items-center justify-between py-5 lg:pb-5 lg:pt-[30px]">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={logoSrc}
              alt="Green Chilli Design Logo"
              width={80}
              height={80}
              className="transition duration-500 hover:scale-110"
            />
          </Link>
        </div>

        <div>
          <NavMenu />
          <NavMenuMobile />
        </div>
      </nav>
    </header>
  );
}
