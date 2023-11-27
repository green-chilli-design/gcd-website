import "../globals.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex flex-row justify-between mt-10 px-5">
      <div>Social Media Links</div>
      <div>
        <Image
          src="/gcd-logo-square-green.svg"
          alt="Green Chilli Design Logo"
          width={80}
          height={80}
        />
      </div>
      <div className="text-end">
        Green Chilli Design · Copyright © {new Date().getFullYear()}
      </div>
    </footer>
  );
}
