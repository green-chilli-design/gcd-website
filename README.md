# GCD Website

_Built upon_: [Next.js Contentful Starter](https://github.com/vercel/next.js/blob/canary/examples/cms-contentful)

# Technologies

- Next.js
- Contentful
- Tailwind
- Vercel

# SiteMap

```
/ <- Home page
/#services
/app-development-auckland
/case-studies
  /case-study-item-slug <- Contentful 'Case Study' content
/contact
```

# Setup

Install dependencies:

```bash
npm install
```

## Vercel CLI

Install vercel CLI (reference: https://vercel.com/docs/cli):

```bash
npm i -g vercel
```

Login to Vercel, ensure you use the GCD Dev github account:

```bash
vercel login
```

## Environment Variables

Pull in the Vercel development environment variables to `env.local`:

```bash
vercel env pull
```

# Development

To run the development server:

```bash
npm run dev
```

# Deployment

The site is hosted on Vercel, and is automatically deployed to the production environment on push to `master`.

Additionally, a preview environment is automatically created for each pull request. Vercel will update the PR with a link to the preview environment, as well as a link to add feedback.

There is also a dedicated development environment, which is deployed to on push to `dev`, and deployed to the domain [gcd-website-dev.vercel.app](https://gcd-website-dev.vercel.app/). Where the prod and preview environments use the master Contentful environment, the dev environment uses the dev Contentful environment (specific environment variables for this are set up in Vercel). The dev environment is where you can test changes to the Contentful content model.

# Google Maps

Contact page uses Google Maps to display the location of the office. The API key is stored in the Vercel environment variables.
If you need to update the allowed sites for the API key, you can do so in the Google Cloud Console:

https://console.cloud.google.com/apis/credentials/key/b3d2a56f-4253-4a7f-87e8-1eaef9300681?project=green-chilli-map

# Recaptcha

Similar to Google Maps API, the Recaptcha only works on allowed domains. The list of allowed domains can be updated in the Google Recaptcha admin console:

https://www.google.com/recaptcha/admin/site/689803774/settings
