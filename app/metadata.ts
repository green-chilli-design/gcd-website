import type { Metadata } from "next";

const title =
  "Custom web software and mobile app development Auckland | Website development | GCD";
const description =
  "Experts in custom Web and Mobile Apps | Driving Business Growth with over a decade of innovative digital solutions | GCD";
const siteUrl = "https://gcd.nz";
const imageUrl =
  "https://images.ctfassets.net/r9ulzvk6fhkd/5sjFy0FK8so2vEOTqNfYAR/73dc5468954502e74cee9803511e621f/WEV_Building.png";
const imageAlt = "Whatever Buiding";
const imageWidth = 608;
const imageHeight = 886;
const imageType = "image/png";
const twitterUsername = "@gcdigital_tweet";

export const sharedMetadata: Metadata = {
  title: title,
  description: description,
  icons: [
    {
      url: "/favicon.ico",
      rel: "icon",
      type: "image/x-icon",
    },
    // TODO: add more icons
  ],
  openGraph: {
    title: title,
    url: siteUrl,
    description: description,
    type: "website",
    images: [
      {
        url: imageUrl,
        type: imageType,
        width: imageWidth,
        height: imageHeight,
        alt: imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    site: twitterUsername,
    images: [
      {
        url: imageUrl,
        type: imageType,
        width: imageWidth,
        height: imageHeight,
        alt: imageAlt,
      },
    ],
  },
};
