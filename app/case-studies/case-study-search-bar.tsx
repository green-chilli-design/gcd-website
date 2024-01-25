"use client";

import { useSearchParams } from "next/navigation";

export default function CaseStudySearchBar() {
  const searchParams = useSearchParams();

  const search = searchParams.get("category");

  // This will not be logged on the server when using static rendering
  console.log(search);

  return <section className="main-content my-10">Search: {search}</section>;
}
