import { useContext, useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "./NavMenu";
import { cn } from "@/lib/utils";
import { DarkNavBarContext } from "./NavBar";

export default function NavMenuMobile() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <div
        className={`main-content absolute bottom-0 right-0 top-[120px] flex h-screen w-full flex-col bg-neutral pb-[120px] pt-14 duration-300 ease-in-out dark:bg-black lg:hidden
        ${menuOpen ? "left-0" : "left-[-100%]"}`}
      >
        <Link
          href="/"
          onClick={handleMenu}
          className={cn(
            "mb-10",
            pathname.length === 1
              ? "text-green"
              : "hover:text-green hover:underline",
          )}
        >
          <h4>Home</h4>
        </Link>

        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={label}
              onClick={handleMenu}
              href={href}
              className={`mb-10 ${
                isActive ? "text-green" : "hover:text-green hover:underline"
              }`}
            >
              <h4>{label}</h4>
            </Link>
          );
        })}
        <Link
          key={"Start a Project"}
          href={"/contact"}
          className={"mb-10 text-black"}
        >
          <h4>Start a Project</h4>
        </Link>

        <ThemeSwitch isMobile={true} />
      </div>

      {/* menu icons */}
      <div
        onClick={handleMenu}
        className="flex cursor-pointer transition duration-500 hover:scale-110 lg:hidden"
      >
        {menuOpen ? (
          <span className="material-icons-outlined icon-48">
            horizontal_rule
          </span>
        ) : (
          <span className="material-icons-outlined icon-48">menu</span>
        )}
      </div>
    </div>
  );
}
