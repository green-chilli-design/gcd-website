import { NAV_LINKS } from "@/lib/constants";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-5 sm:flex">
      {NAV_LINKS.map(({ href, label }) => {
        const isActive = pathname.startsWith(href);

        return (
          <Link
            key={label}
            href={href}
            className={`text-sm font-bold ${
              pathname === "/" ? "text-neutral" : ""
            } ${isActive ? "text-green" : "hover:text-green hover:underline"}`}
          >
            {label}
          </Link>
        );
      })}
      <ThemeSwitch />
    </div>
  );
}
