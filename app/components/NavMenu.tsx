import Link from "next/link";
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
];

export default function NavMenu() {
  const { resolvedTheme } = useTheme();
  const navBarScrolled = useContext(NavBarContainerScrolledContext);

  return (
    <div className="hidden items-center gap-16 lg:flex">
      {NAV_LINKS.map(({ href, label }) => {
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
            ? "flex w-32 items-center justify-center text-sm font-bold text-green hover:text-green hover:underline"
            : "btn green flex w-32 items-center justify-center text-black"
        }
      >
        Let's Talk
      </Link>
      <ThemeSwitch />
    </div>
  );
}
