import Link from "next/link";
import Image from "next/image";
import icon from "@/public/icons/arrow_forward.svg";

export default function ViewMore({ path }: { path: string }) {
  return (
    <Link href={path || ""} className="flex items-center">
      <Image
        src={icon}
        alt="View More"
        className="transition duration-500 hover:scale-110"
        width={40}
        height={40}
      />
    </Link>
  );
}
