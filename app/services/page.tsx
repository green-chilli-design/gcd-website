import Link from "next/link";
import { draftMode } from "next/headers";

import CoverImage from "../cover-image";

import { getAllServices } from "@/lib/api";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mb-16 md:mb-12">
      <h1 className="text-xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
        Services.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        What we offer.
      </h2>
    </section>
  );
}

function ServicePreview({
  title,
  summary,
  coverImage,
  slug,
}: {
  title: string;
  summary: string;
  coverImage: any;
  slug: string;
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          title={title}
          path="/services"
          slug={slug}
          url={coverImage.url}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/services/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <p className="text-lg leading-relaxed mb-4">{summary}</p>
    </div>
  );
}

function AllServices({ services }: { services: any[] }) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {services?.map((service) => (
          <ServicePreview
            key={service.slug}
            title={service.title}
            coverImage={service.coverImage}
            slug={service.slug}
            summary={service.summary}
          />
        ))}
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allServices = await getAllServices(isEnabled);

  return (
    <div className="container">
      <Intro />
      <AllServices services={allServices} />
    </div>
  );
}
