import { getPageBySlug } from "@/lib/api";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  if (!slug) {
    return new Response("Invalid slug", { status: 400 });
  }

  const page = await getPageBySlug(slug, true);

  if (!page) {
    return new Response("Page not found", { status: 400 });
  }

  const route = slug === "home" ? "/" : `/${slug}`;

  if (!route) {
    return new Response("Unknown page", { status: 400 });
  }

  draftMode().enable();
  redirect(route);
}
