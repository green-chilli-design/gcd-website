import "../globals.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex flex-row justify-between mt-10">
      <div>Social Media Links</div>
      <div>
        <Image
          src="/gcd-logo-white-text.svg"
          alt="Green Chilli Design Logo"
          width={80}
          height={80}
        />
      </div>
      <div>Green Chilli Design · Copyright © {new Date().getFullYear()}</div>
    </footer>
  );
}
