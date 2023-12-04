import Link from "next/link";
import "../globals.css";
import Image from "next/image";
import SubscribeForm from "./SubscribeForm";

export default function Footer() {
  return (
    <footer className="w-full flex flex-row justify-between mt-10 px-5">
      <div>
        <Image
          src="/gcd-logo-square-green.svg"
          alt="Green Chilli Design Logo"
          width={100}
          height={90}
        />
      </div>
      <div>
        <p>Select topics and stay current with our latest insights</p>
        <SubscribeForm />
      </div>
      <Link
        href="/privacy-policy"
        className="font-bold text-sm hover:text-green hover:underline transition duration-300"
      >
        Privacy Policy
      </Link>
      <div className="text-end">
        Green Chilli Design · Copyright © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
