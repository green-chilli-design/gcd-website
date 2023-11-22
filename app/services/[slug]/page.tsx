import Link from "next/link";
import { draftMode } from "next/headers";

import CoverImage from "../../cover-image";
import { Markdown } from "@/lib/markdown";

import { getAllServices, getServiceBySlug } from "@/lib/api";

export async function generateStaticParams() {
  const allServices = await getAllServices(false);

  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const service = await getServiceBySlug(params.slug, isEnabled);

  return (
    <div className="container mx-auto px-5">
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <Link href="/services" className="hover:underline">
          Services
        </Link>
        .
      </h2>
      <article>
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
          {service.title}
        </h1>
        <div className="mb-8 md:mb-16 sm:mx-0">
          <CoverImage title={service.title} url={service.coverImage.url} />
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 text-lg">
            <p>{service.summary}</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="prose">
            <Markdown content={service.description} />
          </div>
        </div>
      </article>
    </div>
  );
}
