import { concat, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/experimental-nextjs-app-support";

const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
});

const authLink = (preview = false) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${
        preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
      }`,
    },
  }));

const client = registerApolloClient(
  () =>
    new ApolloClient({
      cache: new InMemoryCache(),
      link: concat(authLink(), httpLink),
    }),
);

const previewClient = registerApolloClient(
  () =>
    new ApolloClient({
      cache: new InMemoryCache(),
      link: concat(authLink(true), httpLink),
    }),
);

export const apollo = (preview = false) => (preview ? previewClient : client);
