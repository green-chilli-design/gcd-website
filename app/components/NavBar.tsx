import NavMenu from "./NavMenu";
import NavMenuMobile from "./NavMenuMobile";
import GCDLogo from "./GCDLogo";

export default function NavBar() {
  return (
    <header className="z-10 w-full">
      <nav className="main-content flex items-center justify-between py-5 lg:pb-5 lg:pt-[30px]">
        <GCDLogo className={"transition duration-500 hover:scale-110"} />
        <div>
          <NavMenu />
          <NavMenuMobile />
        </div>
      </nav>
    </header>
  );
}
