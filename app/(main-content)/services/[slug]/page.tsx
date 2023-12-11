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
  parent: ResolvingMetadata,
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
    <div className="mx-[18px] md:container md:mx-auto">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/services" className="hover:underline">
          Services
        </Link>
        .
      </h2>
      <article>
        <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
          {service.title}
        </h1>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={service.title} url={service.coverImage.url} />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 text-lg">
            <p>{service.summary}</p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="prose">
            <Markdown content={service.description} />
          </div>
        </div>
      </article>
    </div>
  );
}
