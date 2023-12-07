"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  return (
    <header className="w-full z-10 ease-in duration-300 dark:text-neutral dark:bg-black">
      <nav className="flex justify-between items-center py-5 lg:pt-[30px] lg:pb-5 md:container md:mx-auto mx-[18px]">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/gcd-logo-round-black.svg"
              alt="Green Chilli Design Logo"
              width={80}
              height={80}
              className="hover:scale-110 transition duration-500"
            />
          </Link>
        </div>

        {/* menu - sm screens upwards */}
        <div className="hidden sm:flex items-center gap-5">
          {navlinks.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);

            return (
              <Link
                key={label}
                href={href}
                className={`font-bold text-sm ${
                  isActive ? "text-green" : "hover:text-green hover:underline"
                } transition duration-300`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* menu - mobile */}
        <div
          className={
            menuIcon
              ? "sm:hidden absolute top-[120px] pb-[120px] right-0 bottom-0 left-0 flex flex-col justify-center items-center w-full h-screen bg-black text-neutral ease-in duration-300"
              : "sm:hidden absolute top-[120px] pb-[120px] right-0 bottom-0 left-[-100%] flex flex-col justify-center items-center w-full h-screen bg-black text-neutral text-center ease-out duration-300"
          }
        >
          <Link
            href="/"
            onClick={handleMenuIcon}
            className={`mb-5 font-bold text-sm ${
              pathname.length === 1
                ? "text-green"
                : "hover:text-green hover:underline"
            } transition duration-300`}
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
                className={`mb-5 font-bold text-sm ${
                  isActive ? "text-green" : "hover:text-green hover:underline"
                } transition duration-300`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* menu icons */}
        <div
          onClick={handleMenuIcon}
          className="flex sm:hidden hover:scale-110 transition duration-500 cursor-pointer"
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
