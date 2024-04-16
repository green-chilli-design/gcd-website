// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
const sampleRate =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ? 0.1 : 1;

Sentry.init({
  dsn: "https://7bf744f90e7ff7249502fee614dc230e@o1036063.ingest.sentry.io/4506669618495488",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: sampleRate,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  replaysOnErrorSampleRate: sampleRate,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: sampleRate,

  // You can remove this option if you're not planning to use the Sentry Session Replay feature:
  integrations: [
    Sentry.replayIntegration({
      // Additional Replay configuration goes in here, for example:
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
