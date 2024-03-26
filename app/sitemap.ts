import { getCaseStudies, getAllPosts, getAllServices } from "@/lib/api";
import { MetadataRoute } from "next";
import * as Sentry from "@sentry/nextjs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gcd.nz";

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    // TODO: Disabled for MVP
    // {
    //   url: baseUrl + "/services",
    //   lastModified: new Date(),
    // },
    {
      url: baseUrl + "/case-studies",
      lastModified: new Date(),
    },
    // TODO: Disabled for MVP
    // {
    //   url: baseUrl + "/blog",
    //   lastModified: new Date(),
    // },
    // {
    //   url: baseUrl + "/about",
    //   lastModified: new Date(),
    // },
    {
      url: baseUrl + "/contact",
      lastModified: new Date(),
    },
    {
      url: baseUrl + "/privacy-policy",
      lastModified: new Date(),
    },
  ];

  const dynamicPages = [];

  try {
    // Fetch all case study pages
    const caseStudies = await getCaseStudies(false, null);
    const caseStudyPages = caseStudies.map((caseStudy) => {
      return {
        url: `${baseUrl}/case-studies/${caseStudy.slug}`,
        lastModified: new Date(),
      };
    });
    dynamicPages.push(...caseStudyPages);

    // TODO: Disabled for MVP
    // Fetch all service pages
    // const services = await getAllServices(false);
    // const servicePages = services.map((service) => {
    //   return {
    //     url: `${baseUrl}/services/${service.slug}`,
    //     lastModified: new Date(),
    //   };
    // }    );
    // dynamicPages.push(...servicePages);

    // Fetch all blog post pages
    // const posts = await getAllPosts(false);
    // const postPages = posts.map((post) => {
    //   return {
    //     url: `${baseUrl}/posts/${post.slug}`,
    //     lastModified: new Date(),
    //   };
    // }
    // );
    // dynamicPages.push(...postPages);
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
  }

  return [...staticPages, ...dynamicPages];
}
