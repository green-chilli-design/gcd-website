import Image, { ImageLoader } from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex w-full justify-between items-center  mb-10">
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
        {/* <div>
          <Link
            href="/services"
            className="font-bold text-sm hover:text-green transition duration-300"
          >
            Services
          </Link>
        </div> */}
        <div>
          <Link
            href="/case-studies"
            className="font-bold text-sm hover:text-green transition duration-300"
          >
            Case Studies
          </Link>
        </div>
        {/* <div>
          <Link
            href="/blog"
            className="font-bold text-sm hover:text-green transition duration-300"
          >
            Blog
          </Link>
        </div> */}
        {/* <div>
          <Link
            href="/about"
            className="font-bold text-sm hover:text-green transition duration-300"
          >
            About
          </Link>
        </div> */}
        <div>
          <Link
            href="/contact"
            className="font-bold text-sm hover:text-green transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
