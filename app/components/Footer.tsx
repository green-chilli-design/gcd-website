"use client";

import "@/app/globals.css";
import gcdLogoGreen from "@/public/gcd-logo-square-green.svg";
import gcdLogoWhite from "@/public/gcd-logo-white-text.svg";
import paehokohokoLogoWhite from "@/public/images/pae-hokohoko-marketplace-white.svg";
import paehokohokoLogo from "@/public/images/pae-hokohoko-marketplace.png";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { LinkedinIcon } from "react-share";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  let logoSrc = gcdLogoGreen;
  let paehokohokoLogoSrc = paehokohokoLogo;
  if (resolvedTheme === "dark") {
    logoSrc = gcdLogoWhite;
    paehokohokoLogoSrc = paehokohokoLogoWhite;
  }

  // Social icon colors
  const fillColor = resolvedTheme === "dark" ? "#080708" : "#F7F4F3";
  const bgColor = resolvedTheme === "dark" ? "#F7F4F3" : "#080708";

  return (
    <footer className="main-content border-t border-black pb-5 pt-[50px] dark:border-neutral md:py-14">
      <div className="mb-[50px] justify-between md:mb-14 md:flex">
        <div className="mb-[50px] md:mb-0">
          <Link href="/">
            <Image
              src={logoSrc}
              alt="Green Chilli Design Logo"
              width={90}
              height={29}
            />
          </Link>
        </div>

        <div className="flex flex-col justify-end md:flex-row md:gap-10">
          <Link
            href="/privacy-policy"
            className="mb-10 text-sm font-bold transition duration-300 hover:text-green md:mb-0"
          >
            Privacy Policy
          </Link>
          <Link
            href="/contact"
            className="text-sm font-bold transition duration-300 hover:text-green"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between md:flex-row md:flex-wrap md:items-end">
        <Link
          href="https://marketplace.govt.nz/"
          target="_blank"
          className="mb-[37px] md:mb-0"
        >
          <Image
            width={99}
            height={31}
            src={paehokohokoLogoSrc}
            alt="pae hokohoko marketplace logo"
          />
        </Link>
        <div className="order-last flex flex-col items-center text-2xs md:order-none">
          <span>
            &copy;2008&ndash;
            {new Date().toLocaleDateString("en", { year: "2-digit" })} GCD, Ltd.
            All rights reserved
          </span>
          <span className="text-dark-grey">NZBN 9429032928655</span>
        </div>
        <div className="mb-[37px] flex flex-row items-center gap-5 md:mb-0">
          {/* TODO: Disabled Subscribe form for MVP */}
          {/* <SubscribeForm /> */}
          <Link
            href="https://www.linkedin.com/company/green-chilli-digital/"
            target="_blank"
            className="transition duration-500 hover:scale-110"
          >
            <LinkedinIcon
              size={40}
              iconFillColor={fillColor}
              bgStyle={{ fill: bgColor }}
              round
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
