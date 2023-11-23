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
};
