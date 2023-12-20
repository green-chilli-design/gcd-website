import Link from "next/link";

export default function ViewMore({ path }: { path: string }) {
  return (
    <Link href={path || ""} className="flex items-center">
      <img
        src="./icons/arrow_forward.svg"
        alt="View More"
        className="transition duration-500 hover:scale-110"
        width={40}
        height={40}
      />
    </Link>
  );
}
