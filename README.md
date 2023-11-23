# GCD Website

_Built upon_: [Next.js Contentful Starter](https://github.com/vercel/next.js/blob/canary/examples/cms-contentful)

# Technologies

- Next.js
- Contentful
- Tailwind
- Vercel

# SiteMap

## MVP

```
/ <- Home page
/case-studies
  /case-study-item-slug <- Contentful 'Case Study' content
/contact
```

## Final

```
/ <- Home page
/services
  /service-item-slug <- Contentful 'Service' content
/blog
  /post-slug <- Contentful 'Post' content
/case-studies
  /case-study-item-slug <- Contentful 'Case Study' content
/contact
/about
```

# Deployment

The site is hosted on Vercel, and is automatically deployed to the production environment on push to `master`.

Additionally, a preview environment is automatically created for each pull request. Vercel will update the PR with a link to the preview environment, as well as a link to add feedback.

There is also a dedicated development environment, which is deployed to on push to `dev`, and deployed to the domain [gcd-website-dev.vercel.app](https://gcd-website-dev.vercel.app/). Where the prod and preview environments use the master Contentful environment, the dev environment uses the dev Contentful environment (specific environment variables for this are set up in Vercel). The dev environment is where you can test changes to the Contentful content model.

# ToDo:

- [x] Figure out how to handle Contentful model for single page content
- [ ] Update `Content Block` model to allow specifying background colour
- [ ] Set up new Content models
  - [ ] Allow linking of Services to Case Studies
- [ ] Force cache revalidation on all posts
- [ ] Deploy a permanent preview environment
- [ ] Set up Doppler integration
- [ ] Set up Google Analytics
- [ ] Set up Hotjar
- [ ] Set up Storybook
