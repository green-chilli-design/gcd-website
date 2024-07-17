import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "@/app/(main)/date";
import CoverImage from "@/app/(main)/cover-image";
import Avatar from "@/app/(main)/avatar";
import MoreStories from "@/app/(main)/blog/more-stories";

import { getAllPosts } from "@/lib/api";
import type { Metadata } from "next";

const title = "GCD | Blog";
export const metadata: Metadata = {
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
        Blog.
      </h1>
      <h2 className="mt-5 text-center text-lg md:pl-8 md:text-left">
        Read what GCD is up to.
      </h2>
    </section>
  );
}

function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage
          title={title}
          path="/posts"
          slug={slug}
          url={coverImage.url}
        />
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <div className="main-content">
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
