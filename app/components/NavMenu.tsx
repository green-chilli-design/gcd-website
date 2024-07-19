import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
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

interface NavMenuProps {
  darkNavBar: boolean;
}

export default function NavMenu({ darkNavBar }: NavMenuProps) {
  const pathname = usePathname();

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
              darkNavBar && !isActive ? "text-white" : "",
              isActive ? "text-green" : "hover:text-green hover:underline",
            )}
          >
            {label}
          </Link>
        );
      })}
      <ThemeSwitch darkNavBar={darkNavBar} />
    </div>
  );
}
