/** @type {import('next').NextConfig} */
module.exports = {
  // TODO: Temporary redirects for MVP - remove for final site
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/services/:slug",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/blog",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/posts/:slug",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/404",
        permanent: false,
      },
      {
        source: "/mobile",
        destination: "/app-development-auckland",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net", pathname: "**" },
      { protocol: "https", hostname: "videos.ctfassets.net", pathname: "**" },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "gcd-projects",
    project: "gcd-website",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
);
