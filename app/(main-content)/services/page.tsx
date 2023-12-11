import Link from "next/link";
import { draftMode } from "next/headers";

import CoverImage from "@/app/cover-image";

import { getAllServices } from "@/lib/api";

const title = "GCD | Services";
export const metadata = {
  title,
  openGraph: {
    title,
  },
  twitter: {
    title,
  },
};

function Intro() {
  return (
    <section className="mb-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
      <h1 className="text-xl font-bold leading-tight tracking-tighter md:pr-8 md:text-5xl">
        Services.
      </h1>
      <h2 className="mt-5 text-center text-lg md:pl-8 md:text-left">
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
      <h3 className="mb-3 text-3xl leading-snug">
        <Link href={`/services/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <p className="mb-4 text-lg leading-relaxed">{summary}</p>
    </div>
  );
}

function AllServices({ services }: { services: any[] }) {
  return (
    <section>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
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
    <div className="mx-[18px] md:container md:mx-auto">
      <Intro />
      <AllServices services={allServices} />
    </div>
  );
}
