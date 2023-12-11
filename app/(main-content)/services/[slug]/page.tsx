import Link from "next/link";
import { draftMode } from "next/headers";

import CoverImage from "@/app/cover-image";
import { Markdown } from "@/lib/markdown";

import { getAllServices, getServiceBySlug } from "@/lib/api";

import { ResolvingMetadata, Metadata } from "next";

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug, false);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `GCD | ${service.title}`,
    openGraph: {
      title: `GCD | ${service.title}`,
      images: [service.coverImage.url, ...previousImages],
    },
    twitter: {
      title: `GCD | ${service.title}`,
      images: [service.coverImage.url, ...previousImages],
    },
  };
}

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
    <div className="md:container md:mx-auto mx-[18px]">
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
