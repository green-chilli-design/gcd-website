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
    <footer className="w-full pt-[50px] pb-5 lg:py-[50px] md:container md:mx-auto mx-[18px]">
      <div className="mb-[50px]">
        <Link href="/">
          <Image
            src={logoSrc}
            alt="Green Chilli Design Logo"
            width={90}
            height={29}
          />
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row justify-end lg:gap-10 mb-[50px]">
        {/* TODO: Disabled Subscribe form for MVP */}
        {/* <p>Select topics and stay current with our latest insights</p>
        <SubscribeForm /> */}
        <Link
          href="/privacy-policy"
          className="font-bold text-sm hover:text-green transition duration-300 mb-10 lg:mb-0"
        >
          Privacy Policy
        </Link>
        <Link
          href="/contact"
          className="font-bold text-sm hover:text-green transition duration-300 mb-10 lg:mb-0"
        >
          Contact Us
        </Link>
      </div>

      <div className="flex flex-col-reverse lg:flex-row lg:flex-wrap justify-between lg:items-end">
        <div className="text-2xs">
          Green Chilli Design · Copyright © {new Date().getFullYear()}
        </div>
        <div className="flex flex-row gap-5 mb-[50px] lg:mb-0">
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
