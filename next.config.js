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
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net", pathname: "**" },
    ],
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
    org: "green-chilli-design",
    project: "gcd-website",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: false,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: false,

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
  }
);
