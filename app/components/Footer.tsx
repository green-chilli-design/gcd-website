"use client";

import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";
import SubscribeForm from "@/app/components/forms/SubscribeForm";
import { useTheme } from "next-themes";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  let logoSrc = "/gcd-logo-square-green.svg";
  if (resolvedTheme === "dark") {
    logoSrc = "/gcd-logo-square-white.svg";
  }

  return (
    <footer className="main-content pb-5 pt-[50px] md:py-14">
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
            src={"/images/pae-hokohoko-marketplace.png"}
            alt="pae hokohoko marketplace logo"
          />
        </Link>
        <div className="order-last text-2xs md:order-none">
          Green Chilli Design · Copyright © {new Date().getFullYear()}
        </div>
        <div className="mb-[37px] flex flex-row items-center gap-5 md:mb-0">
          {/* TODO: Disabled Subscribe form for MVP */}
          {/* <SubscribeForm /> */}
          <Link
            href="https://www.linkedin.com/company/green-chilli-digital/"
            target="_blank"
          >
            <Image
              width={40}
              height={40}
              src={"/icons/linkedin.svg"}
              alt="linkedin logo"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
