import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getServiceBySlug } from "../../../../lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const service = await getServiceBySlug(slug, true);

  if (!service) {
    return new Response("Invalid slug", { status: 401 });
  }

  draftMode().enable();
  redirect(`/services/${service.slug}`);
}
