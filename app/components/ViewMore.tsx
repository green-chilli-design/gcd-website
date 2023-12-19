import Link from "next/link";

export default function ViewMore({ path }: { path: string }) {
  return (
    <Link href={path || ""} className="flex items-center hover:animate-pulse">
      <span className="mr-[5px] uppercase">View More</span>
      <span className="material-symbols-outlined icon-24">arrow_forward</span>
    </Link>
  );
}
