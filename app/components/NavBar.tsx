"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
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

  return (
    <nav className="flex w-full justify-between items-center px-5 mb-10">
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
      <div className="flex items-center gap-5">
        {navlinks.map(({ href, label }) => {
          const isActive = pathname.startsWith(href);

          return (
            <div>
              <Link
                href={href}
                className={`font-bold text-sm ${
                  isActive ? "text-green" : "hover:text-green hover:underline"
                } transition duration-300`}
              >
                {label}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
