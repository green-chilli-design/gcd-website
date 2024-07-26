"use client";

import ContentfulMedia from "@/lib/contentful-media";
import { Markdown } from "@/lib/markdown";
import { useTheme } from "next-themes";

export default function AppReviewCard({ contentBlock }: { contentBlock: any }) {
  const { resolvedTheme } = useTheme();
  return (
    <section key={contentBlock.heading}>
      <pre>{JSON.stringify(contentBlock, null, 2)}</pre>
    </section>
  );
}
