# GCD Website

_Built upon_: [Next.js Contentful Starter](https://github.com/vercel/next.js/blob/canary/examples/cms-contentful)

# Technologies

- Next.js
- Contentful
- Tailwind

# SiteMap

```
/ <- Home page
/services
  /service-item-slug <- Contentful 'Service' content
/contact
/blog
  /post-slug <- Contentful 'Post' content
/portfolio
  /portfolio-item-slug <- Contentful 'Portfolio Item' content
/contact
/about
```

# ToDo:

- [x] Figure out how to handle Contentful model for single page content
- [ ] Update `Content Block` model to allow specifying background colour
- [ ] Set up new Content models
  - [ ] Allow linking of services to Portfolio items
- [ ] Force cache revalidation on all posts
- [ ] Deploy a permanent preview environment
- [ ] Set up Doppler integration
- [ ] Set up Google Analytics
- [ ] Set up Hotjar
- [ ] Set up Storybook
