// TODO: This should be refactored into something reusable

async function fetchGraphQL(
  query: string,
  preview = false,
  tags = ["posts"],
): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
    {
      cache: `${process.env.DISABLE_CACHING ? "no-cache" : "force-cache"}`, // Disables caching when true
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      next: { tags: tags },
    },
  ).then((response) => response.json());
}

/******** BEGIN POST API FUNCTIONS ************/
const POST_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  date
  author {
    name
    picture {
      url
    }
  }
  excerpt
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.postCollection?.items;
}

export async function getPostBySlug(
  slug: string | null,
  preview: boolean = false,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  return extractPost(entry);
}

export async function getAllPosts(preview: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
    ["posts"],
  );
  return extractPostEntries(entries);
}

export async function getPostAndMorePosts(
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
    ["post"],
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
    ["posts"],
  );
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  };
}

/******** BEGIN SERVICES API FUNCTIONS ************/
const SERVICES_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  summary
`;

const SERVICE_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  summary
  description {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
`;

function extractServiceEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.serviceCollection?.items;
}

function extractService(fetchResponse: any): any {
  return fetchResponse?.data?.serviceCollection?.items?.[0];
}

export async function getAllServices(preview: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      serviceCollection(where: { slug_exists: true }, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          ${SERVICES_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
    ["services"],
  );
  return extractServiceEntries(entries);
}

export async function getServiceBySlug(
  slug: string | null,
  preview: boolean = false,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        serviceCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            ${SERVICE_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
    ["service"],
  );
  return extractService(entry);
}

/******** BEGIN CASE STUDIES API FUNCTIONS ************/
const CASE_STUDIES_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
  }
  summary
  featured
`;

const CASE_STUDY_GRAPHQL_FIELDS = `
  slug
  title
  coverImage {
    url
    width
    height
  }
  summary
  description {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
  featureSection {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          url
          description
        }
      }
    }
  }
  featureImage {
    url
    width
    height
  }
  backgroundImage {
    url
    width
    height
  }
`;

function extractCaseStudiesEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.caseStudyCollection?.items;
}

function extractCaseStudy(fetchResponse: any): any {
  return fetchResponse?.data?.caseStudyCollection?.items?.[0];
}

export async function getAllCaseStudies(preview: boolean): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      caseStudyCollection(where: { slug_exists: true }, order: sys_publishedAt_DESC, preview: ${
        preview ? "true" : "false"
      }) {
        items {
          ${CASE_STUDIES_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
    ["caseStudies"],
  );
  return extractCaseStudiesEntries(entries);
}

export async function getCaseStudyBySlug(
  slug: string | null,
  preview: boolean = false,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        caseStudyCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            ${CASE_STUDY_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
    ["caseStudy"],
  );
  return extractCaseStudy(entry);
}

/******** BEGIN PAGE API FUNCTIONS ************/
/**
 * TODO: All of these functions should be refactored into either something reusable or reside with the appropriate component
 */

/**
 * Page API functions
 */

const PAGE_GRAPHQL_FIELDS = `
  title
  subtitle
  slug
  heroImage {
    url
    width
    height
  }
  description
  pageContentCollection(limit: 10) {
    items { 
      __typename
      ... on ContentBlock {
        heading
        subHeading
        contentBody {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                url
                description
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export async function getPageBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        pageCollection(where: { slug: "${slug}" }, preview: false, limit: 1) {
          items {
            ${PAGE_GRAPHQL_FIELDS}
          }
        }
      }`,
    true,
    ["pages"],
  );
  return extractPage(entry);
}

function extractPage(fetchResponse: any): any {
  return fetchResponse?.data?.pageCollection?.items?.[0];
}

/******** BEGIN ASSETS API FUNCTIONS ************/
/**
 * Assets API functions
 */

const ASSET_GRAPHQL_FIELDS = `
  title
  description
  url
  width
  height
`;

function extractAsset(fetchResponse: any): any {
  return fetchResponse?.data?.assetCollection?.items?.[0];
}

export async function getAssetByTitle(title: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        assetCollection(where: { title: "${title}" }, preview: false, limit: 1) {
          items {
            ${ASSET_GRAPHQL_FIELDS}
          }
        }
      }`,
    true,
    ["assets"],
  );
  return extractAsset(entry);
}
