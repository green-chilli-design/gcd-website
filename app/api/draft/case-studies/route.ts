import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getCaseStudyBySlug } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const caseStudy = await getCaseStudyBySlug(slug, true);

  if (!caseStudy) {
    return new Response("Invalid slug", { status: 401 });
  }

  draftMode().enable();
  redirect(`/case-studies/${caseStudy.slug}`);
}
