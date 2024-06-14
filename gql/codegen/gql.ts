/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetServices($preview: Boolean = false) {\n    serviceCollection(\n      where: { slug_exists: true }\n      order: order_ASC\n      preview: $preview\n    ) {\n      items {\n        slug\n        title\n        coverImage {\n          url\n        }\n        summary\n      }\n    }\n  }\n": types.GetServicesDocument,
    "\n  query GetServiceBySlugQuery($slug: String, $preview: Boolean = false) {\n    serviceCollection(where: { slug: $slug }, preview: $preview, limit: 1) {\n      items {\n        slug\n        title\n        coverImage {\n          url\n        }\n        summary\n        description {\n          json\n          links {\n            assets {\n              block {\n                sys {\n                  id\n                }\n                url\n                description\n                width\n                height\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetServiceBySlugQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetServices($preview: Boolean = false) {\n    serviceCollection(\n      where: { slug_exists: true }\n      order: order_ASC\n      preview: $preview\n    ) {\n      items {\n        slug\n        title\n        coverImage {\n          url\n        }\n        summary\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetServices($preview: Boolean = false) {\n    serviceCollection(\n      where: { slug_exists: true }\n      order: order_ASC\n      preview: $preview\n    ) {\n      items {\n        slug\n        title\n        coverImage {\n          url\n        }\n        summary\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetServiceBySlugQuery($slug: String, $preview: Boolean = false) {\n    serviceCollection(where: { slug: $slug }, preview: $preview, limit: 1) {\n      items {\n        slug\n        title\n        coverImage {\n          url\n        }\n        summary\n        description {\n          json\n          links {\n            assets {\n              block {\n                sys {\n                  id\n                }\n                url\n                description\n                width\n                height\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetServiceBySlugQuery($slug: String, $preview: Boolean = false) {\n    serviceCollection(where: { slug: $slug }, preview: $preview, limit: 1) {\n      items {\n        slug\n        title\n        coverImage {\n          url\n        }\n        summary\n        description {\n          json\n          links {\n            assets {\n              block {\n                sys {\n                  id\n                }\n                url\n                description\n                width\n                height\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;