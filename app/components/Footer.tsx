import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";

// GCD Company Logo Variants
import logoImgGreen from "@/public/gcd-logo-round-green.svg";
import logoImgWhite from "@/public/gcd-logo-round-white.svg";

// Import Facebook, Twitter and LinkedIn icons
import facebookLogo from "@/public/icons/facebook.svg";
import twitterLogo from "@/public/icons/twitter.svg";
import linkedInLogo from "@/public/icons/linkedin.svg";

export default function Footer() {
  return (
    <footer className="main-content pb-5 pt-[50px] lg:py-14">
      <div className="mb-[50px] justify-between lg:mb-14 lg:flex">
        <div className="mb-[50px] lg:mb-0">
          <Link href="/">
            {/* Light image */}
            <Image
              src={logoImgGreen}
              className="dark:hidden"
              alt="Green Chilli Design Logo"
              width={90}
              height={29}
            />
            {/* Dark image */}
            <Image
              src={logoImgWhite}
              className="hidden dark:block"
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
          <Link href="https://www.facebook.com/GCDigitalFB" target="_blank">
            <Image src={facebookLogo} alt="facebook logo" />
          </Link>
          <Link href="https://twitter.com/gcdigital_tweet" target="_blank">
            <Image src={twitterLogo} alt="twitter logo" />
          </Link>
          <Link
            href="https://www.linkedin.com/company/green-chilli-digital/"
            target="_blank"
          >
            <Image src={linkedInLogo} alt="linkedin logo" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
