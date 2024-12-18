// TODO: This should be refactored into something reusable

import { ContentTag } from "@/app/api/revalidate/route";

async function fetchGraphQL(
  query: string,
  preview: boolean = false,
  tags: ContentTag[],
): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
    {
      cache: `${
        process.env.DISABLE_CACHING || preview ? "no-cache" : "force-cache"
      }`, // Disables caching when true
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
          width
          height
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
    ["posts"],
  );
  return extractPost(entry);
}

export async function getAllPosts(preview: boolean = false): Promise<any[]> {
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
  preview: boolean = false,
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
  servicePage  {
    slug
  }
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
          width
          height
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

export async function getAllServices(preview: boolean = false): Promise<any[]> {
  const entries = await fetchGraphQL(
    `query {
      serviceCollection(where: { slug_exists: true }, order: order_ASC, preview: ${preview}) {
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
  sortOrder
  coverImage {
    url
  }
  summary
  featured
  category {
    name
  }
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
  category {
    name
  }
  client {
    name
  }
  projectType
  industry
  deliverables
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
          width
          height
        }
      }
    }
  }
  body {
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
  pageContentCollection(limit: 5) {
    items { 
      __typename
      ... on ContentBlockWithImage {
        heading
        body {
          json
        }
        image {
          url
          width
          height
        }
        darkModeImage {
          url
          width
          height
        }
        imagePosition
      }
      ... on ContentBlock {
        heading
        subHeading
        textAlignment
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

export async function getCaseStudies(
  preview: boolean = false,
  categoryFilter: string | null,
): Promise<any[]> {
  const query = `query {
    caseStudyCollection(where: { slug_exists: true, category: { name: ${
      categoryFilter ? `"` + categoryFilter + `"` : null
    } } } , order: sys_publishedAt_DESC, preview: ${preview}) {
      items {
        ${CASE_STUDIES_GRAPHQL_FIELDS}
      }
    }
  }`;

  const entries = await fetchGraphQL(query, preview, ["caseStudies"]);
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
  bannerContent {
    imagesCollection {
      items {
        title
        url
        width
        height
      }
    }
  }
  description
  pageContentCollection(limit: 10) {
    items { 
      __typename
      ... on ContentBlockWithImage {
        heading
        body {
          json
        }
        image {
          url
          width
          height
        }
        darkModeImage {
          url
          width
          height
        }
        imagePosition
      }
      ... on ContentBlock {
        heading
        subHeading
        textAlignment
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
      ... on AppReviewCard {
        title
        subtitle
        caseStudy {
          title
          slug
          coverImage {
            url
          }
          summary
          category {
            name
          }
          sortOrder
        }
        orientation
        image {
          url
          width
          height
          description
        }
        reviewQuote
      }
      ... on CaseStudy {
        title
        slug
        coverImage {
          url
        }
        summary
        category {
          name
        }
      

      }
    }
  }
`;

export async function getPageBySlug(
  slug: string | null,
  preview: boolean = false,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        pageCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
          items {
            ${PAGE_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
    ["page"],
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

export async function getAssetByTitle(
  title: string | null,
  preview: boolean = false,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        assetCollection(where: { title: "${title}" }, preview: ${preview}, limit: 1) {
          items {
            ${ASSET_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
    ["assets"],
  );
  return extractAsset(entry);
}

/******** BEGIN CONTENT BLOCK API FUNCTIONS ************/
/**
 * Content Blocks API functions
 */

const CONTENT_BLOCK_GRAPHQL_FIELDS = `
  __typename
  heading
  subHeading
  textAlignment
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
`;

export interface ContentfulContentBlock {
  __typename: string;
  heading: string;
  subHeading: string;
  textAlignment: "Center" | "Left" | "Right" | "Justify";
  contentBody: ContentBlockBody;
}

export interface ContentBlockBody {
  json: any;
  links: any;
}

export interface ContentfulContentBlockWithImage
  extends ContentfulContentBlock {
  image: ContentfulImage;
  darkModeImage: ContentfulImage;
  imagePosition: "Left" | "Right";
}

export interface ContentfulImage {
  url: string;
  width: number;
  height: number;
}

function extractContentBlock(fetchResponse: any): any {
  return fetchResponse?.data?.contentBlockCollection?.items?.[0];
}

export async function getContentBlockByName(
  name: string | null,
  preview: boolean = false,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        contentBlockCollection(where: { name: "${name}" }, preview: ${preview}, limit: 1) {
          items {
            ${CONTENT_BLOCK_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
    ["contentBlocks"],
  );
  return extractContentBlock(entry);
}

/******** BEGIN PERSON API FUNCTIONS ************/
/**
 * Person API functions
 */

const PERSONS_GRAPHQL_FIELDS = `
  firstName
  lastName
  role
  actionShot {
    url
  }
  organisationIcon {
    url
    width
    height
  }
`;

const PERSON_GRAPHQL_FIELDS = `
  items {
    firstName
    lastName
    role
    isCurrentTeamMember
    avatar {
      url
    }
    actionShot {
      url
    }
    organisationIcon {
      url
    }
    bio {
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
`;

function extractPersons(fetchResponse: any): any {
  return fetchResponse?.data?.personCollection?.items;
}

function extractPerson(fetchResponse: any): any {
  return fetchResponse?.data?.personCollection?.items?.[0];
}

export async function getAllPersons(
  isCurrentTeamMember: boolean | null = null,
  preview: boolean = false,
): Promise<any> {
  const entries = await fetchGraphQL(
    `query {
        personCollection(where: {isCurrentTeamMember: ${isCurrentTeamMember}}) {
          items {
            ${PERSONS_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
    ["persons"],
  );
  return extractPersons(entries);
}

export async function getPersonByName(
  firstName: string,
  lastName: string,
  preview: boolean = false,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
        personCollection(where: {firstName: "${firstName}", lastName: "${lastName}"}, preview: ${preview}, limit: 1) {
          items {
            ${PERSON_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
    ["person"],
  );

  return extractPerson(entry);
}

/******** BEGIN CLIENT API FUNCTIONS ************/
/**
 * Client API functions
 */

const CLIENTS_GRAPHQL_FIELDS = `
  name
  url
  logo {
    url
    width
    height
  }
  logoDarkMode {
    url
    width
    height
  }
`;

function extractClients(fetchResponse: any): any {
  return fetchResponse?.data?.clientCollection?.items;
}

export async function getAllClients(preview: boolean = false): Promise<any> {
  const entries = await fetchGraphQL(
    `query {
        clientCollection(order: priority_ASC, preview: ${preview}) {
          items {
            ${CLIENTS_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
    ["clients"],
  );
  return extractClients(entries);
}

/******** BEGIN CATEGORIES API FUNCTIONS ************/
/**
 * Category API functions
 */

const CATEGORY_GRAPHQL_FIELDS = `
  name
  subCategoriesCollection {
    items {
      name
      description
      coverImage {
        url
      }
    }
  }
`;

function extractCategory(fetchResponse: any): any {
  return fetchResponse?.data?.categoryCollection?.items?.[0];
}

export type TopLevelCategory = "Case Studies" | "Services";

export async function getCategoryByName(
  category: TopLevelCategory,
  preview: boolean = false,
): Promise<any> {
  const entries = await fetchGraphQL(
    `query {
        categoryCollection(where: {name: "${category}"}, limit: 1, preview: ${preview}) {
          items {
            ${CATEGORY_GRAPHQL_FIELDS}
          }
        }
      }`,
    preview,
    ["category"],
  );
  return extractCategory(entries);
}
