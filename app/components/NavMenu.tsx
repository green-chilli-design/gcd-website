import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { useContext } from "react";
import { DarkNavBarContext } from "./NavBar";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  {
    href: "/#services",
    label: "Services",
  },
  {
    href: "/case-studies",
    label: "Case Studies",
  },
  {
    href: "/contact",
    label: "Contact Us",
  },
];

export default function NavMenu() {
  const pathname = usePathname();
  const darkNavBar = useContext(DarkNavBarContext);

  return (
    <div className="hidden items-center gap-16 sm:flex">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = pathname.startsWith(href);

        return (
          <Link
            key={label}
            href={href}
            className={cn(
              "ext-sm font-bold",
              isActive ? "text-green" : "hover:text-green hover:underline",
            )}
          >
            {label}
          </Link>
        );
      })}
      <ThemeSwitch />
    </div>
  );
}
