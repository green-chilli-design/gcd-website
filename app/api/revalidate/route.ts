import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const CONTENT_TAGS = [
  "page",
  "post",
  "posts",
  "service",
  "services",
  "caseStudy",
  "caseStudies",
  "assets",
  "contentBlocks",
  "persons",
  "person",
  "clients",
  "category",
] as const;

export type ContentTag = (typeof CONTENT_TAGS)[number];

/**
 * TODO:
 * Currently this route revalidate all tags, but it could be updated to
 * revalidate a specific tag (which it would take as a parameter from each Contentful webhook)
 */
export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get("x-vercel-reval-key");

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // TODO: This should be updated to take a parameter from the webhook
  CONTENT_TAGS.forEach((tag) => revalidateTag(tag));

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
