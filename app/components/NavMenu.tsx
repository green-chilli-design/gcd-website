import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { useContext } from "react";
import { NavBarContainerScrolledContext } from "./NavBar";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

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
  const { resolvedTheme } = useTheme();
  const navBarScrolled = useContext(NavBarContainerScrolledContext);

  return (
    <div className="hidden items-center gap-16 lg:flex">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = pathname.startsWith(href);

        return (
          <Link
            key={label}
            href={href}
            className={cn(
              "text-sm font-bold hover:text-green hover:underline",
              navBarScrolled &&
                resolvedTheme !== "dark" &&
                "sticky-navbar-text-white",
              !navBarScrolled &&
                resolvedTheme !== "dark" &&
                "sticky-navbar-text",
              resolvedTheme === "dark" && "sticky-navbar-text-white",
            )}
          >
            {label}
          </Link>
        );
      })}
      <Link
        href={"/contact"}
        className={
          navBarScrolled
            ? "flex w-44 items-center justify-center text-sm font-bold text-green hover:text-green hover:underline"
            : "btn green flex w-44 items-center justify-center text-black"
        }
      >
        Start a Project
      </Link>
      <ThemeSwitch />
    </div>
  );
}
