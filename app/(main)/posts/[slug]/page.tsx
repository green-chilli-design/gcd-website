import Link from "next/link";
import { draftMode } from "next/headers";

import MoreStories from "@/app/(main)/blog/more-stories";
import Avatar from "@/app/(main)/avatar";
import Date from "@/app/(main)/date";
import CoverImage from "@/app/(main)/cover-image";

import { Markdown } from "@/lib/markdown";
import { getAllPosts, getPostAndMorePosts, getPostBySlug } from "@/lib/api";

import type { ResolvingMetadata, Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(
  {
    params,
  }: {
    params: { slug: string };
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await getPostBySlug(params.slug, false);
  if (!post) {
    notFound();
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `GCD | ${post.title}`,
    openGraph: {
      title: `GCD | ${post.title}`,
      images: [post.coverImage.url, ...previousImages],
    },
    twitter: {
      title: `GCD | ${post.title}`,
      images: [post.coverImage.url, ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const { post, morePosts } = await getPostAndMorePosts(params.slug, isEnabled);
  if (!post) {
    notFound();
  }

  return (
    <div className="main-content">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          Blog
        </Link>
        .
      </h2>
      <article>
        <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
          {post.title}
        </h1>
        <div className="hidden md:mb-12 md:block">
          {post.author && (
            <Avatar name={post.author.name} picture={post.author.picture} />
          )}
        </div>
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={post.title} url={post.coverImage.url} />
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 block md:hidden">
            {post.author && (
              <Avatar name={post.author.name} picture={post.author.picture} />
            )}
          </div>
          <div className="mb-6 text-lg">
            <Date dateString={post.date} />
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="prose">
            <Markdown content={post.content} />
          </div>
        </div>
      </article>
      <hr className="border-accent-2 mb-24 mt-28" />
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
