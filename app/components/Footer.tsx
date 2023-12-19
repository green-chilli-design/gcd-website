"use client";

import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";
import SubscribeForm from "@/app/components/SubscribeForm";
import { useTheme } from "next-themes";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  let logoSrc = "/gcd-logo-square-green.svg";
  if (resolvedTheme === "dark") {
    logoSrc = "/gcd-logo-square-white.svg";
  }

  return (
    <footer className="main-content pb-5 pt-[50px] lg:py-14">
      <div className="mb-[50px] justify-between lg:mb-14 lg:flex">
        <div className="mb-[50px] lg:mb-0">
          <Link href="/">
            <Image
              src={logoSrc}
              alt="Green Chilli Design Logo"
              width={90}
              height={29}
            />
          </Link>
        </div>

        <div className="flex flex-col justify-end lg:flex-row lg:gap-10">
          <Link
            href="/privacy-policy"
            className="mb-10 text-sm font-bold transition duration-300 hover:text-green lg:mb-0"
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

      {/* TODO: Disabled Subscribe form for MVP */}
      {/* <p>Select topics and stay current with our latest insights</p>
        <SubscribeForm /> */}

      <div className="flex flex-col-reverse justify-between lg:flex-row lg:flex-wrap lg:items-end">
        <div className="text-2xs">
          Green Chilli Design · Copyright © {new Date().getFullYear()}
        </div>
        <div className="mb-[37px] flex flex-row gap-5 lg:mb-0">
          <a href="https://www.facebook.com/GCDigitalFB" target="_blank">
            <img src={"/icons/facebook.svg"} alt="facebook logo" />
          </a>
          <a href="https://twitter.com/gcdigital_tweet" target="_blank">
            <img src={"/icons/twitter.svg"} alt="twitter logo" />
          </a>
          <a
            href="https://www.linkedin.com/company/green-chilli-digital/"
            target="_blank"
          >
            <img src={"/icons/linkedin.svg"} alt="linkedin logo" />
          </a>
        </div>
      </div>
    </footer>
  );
}
