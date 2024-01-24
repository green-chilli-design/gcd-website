import { useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export default function NavMenuMobile() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div
        className={`absolute bottom-0 right-0 top-[120px] flex h-screen w-full flex-col items-center justify-center bg-neutral pb-[120px] duration-300 ease-in-out dark:bg-black sm:hidden
        ${menuOpen ? "left-0" : "left-[-100%]"}`}
      >
        <Link
          href="/"
          onClick={handleMenu}
          className={`mb-5 text-sm font-bold ${
            pathname.length === 1
              ? "text-green"
              : "hover:text-green hover:underline"
          }`}
        >
          Home
        </Link>

        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={label}
              onClick={handleMenu}
              href={href}
              className={`mb-5 text-sm font-bold ${
                isActive ? "text-green" : "hover:text-green hover:underline"
              }`}
            >
              {label}
            </Link>
          );
        })}

        <ThemeSwitch isMobile={true} />
      </div>

      {/* menu icons */}
      <div
        onClick={handleMenu}
        className="flex cursor-pointer transition duration-500 hover:scale-110 sm:hidden"
      >
        {menuOpen ? (
          <span
            className={`material-symbols-outlined icon-48 ${
              pathname === "/" ? "text-neutral" : ""
            }`}
          >
            close
          </span>
        ) : (
          <span
            className={`material-symbols-outlined icon-48 ${
              pathname === "/" ? "text-neutral" : ""
            }`}
          >
            menu
          </span>
        )}
      </div>
    </div>
  );
}