"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import ThemeSwitch from "./ThemeSwitch";

const navlinks = [
  // {
  //   href: "/services",
  //   label: "Services",
  // },
  {
    href: "/case-studies",
    label: "Case Studies",
  },
  // {
  //   href: "/blog",
  //   label: "Blog",
  // },
  // {
  //   href: "/about",
  //   label: "About",
  // },
  {
    href: "/contact",
    label: "Contact Us",
  },
];

export default function NavBar() {
  const pathname = usePathname();
  const [menuIcon, setMenuIcon] = useState(false);

  const handleMenuIcon = () => {
    setMenuIcon(!menuIcon);
  };

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

        {/* menu - sm screens upwards */}
        <div className="hidden items-center gap-5 sm:flex">
          {navlinks.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);

            return (
              <Link
                key={label}
                href={href}
                className={`text-sm font-bold ${
                  isActive ? "text-green" : "hover:text-green hover:underline"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <ThemeSwitch />
        </div>

        {/* menu - mobile */}
        <div
          className={
            menuIcon
              ? "absolute bottom-0 left-0 right-0 top-[120px] flex h-screen w-full flex-col items-center justify-center bg-neutral pb-[120px] duration-300 ease-in dark:bg-black sm:hidden"
              : "absolute bottom-0 left-[-100%] right-0 top-[120px] flex h-screen w-full flex-col items-center justify-center bg-neutral pb-[120px] text-center duration-300 ease-out dark:bg-black sm:hidden"
          }
        >
          <Link
            href="/"
            onClick={handleMenuIcon}
            className={`mb-5 text-sm font-bold ${
              pathname.length === 1
                ? "text-green"
                : "hover:text-green hover:underline"
            }`}
          >
            Home
          </Link>

          {navlinks.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);

            return (
              <Link
                key={label}
                onClick={handleMenuIcon}
                href={href}
                className={`mb-5 text-sm font-bold ${
                  isActive ? "text-green" : "hover:text-green hover:underline"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <ThemeSwitch />
        </div>

        {/* menu icons */}
        <div
          onClick={handleMenuIcon}
          className="flex cursor-pointer transition duration-500 hover:scale-110 sm:hidden"
        >
          {menuIcon ? (
            <span className="material-symbols-outlined icon-48">close</span>
          ) : (
            <span className="material-symbols-outlined icon-48">menu</span>
          )}
        </div>
      </nav>
    </header>
  );
}
