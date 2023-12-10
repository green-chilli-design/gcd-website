import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gcd.nz";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    // {
    //   url: baseUrl + "/services",
    //   lastModified: new Date(),
    // },
    {
      url: baseUrl + "/case-studies",
      lastModified: new Date(),
    },
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
}
