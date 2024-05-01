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
    "\n  mutation DeleteActivity($friendUri: String!) {\n    deleteActivity(friendUri: $friendUri)\n  }\n": types.DeleteActivityDocument,
    "\n  mutation InsertActivity($friendUri: String!, $timestampMs: Float!) {\n    insertActivity(friendUri: $friendUri, timestampMs: $timestampMs)\n  }\n": types.InsertActivityDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($email: String!, $password: String!) {\n    register(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation UpsertNotificationToken($token: String!, $deviceUniqueId: String!) {\n    upsertNotificationToken(token: $token, deviceUniqueId: $deviceUniqueId)\n  }\n": types.UpsertNotificationTokenDocument,
    "\n  mutation UpsertSpotifyAuth(\n    $spdcCookie: String!\n    $accessToken: String!\n    $accessTokenExpirationTimestampMs: Float!\n  ) {\n    upsertSpotifyAuth(\n      spdcCookie: $spdcCookie\n      accessToken: $accessToken\n      accessTokenExpirationTimestampMs: $accessTokenExpirationTimestampMs\n    )\n  }\n": types.UpsertSpotifyAuthDocument,
    "\n  query DoesUserExist($email: String!) {\n    doesUserExist(email: $email)\n  }\n": types.DoesUserExistDocument,
    "\n  query GetActivities {\n    getActivities {\n      friendUri\n    }\n  }\n": types.GetActivitiesDocument,
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
export function graphql(source: "\n  mutation DeleteActivity($friendUri: String!) {\n    deleteActivity(friendUri: $friendUri)\n  }\n"): (typeof documents)["\n  mutation DeleteActivity($friendUri: String!) {\n    deleteActivity(friendUri: $friendUri)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InsertActivity($friendUri: String!, $timestampMs: Float!) {\n    insertActivity(friendUri: $friendUri, timestampMs: $timestampMs)\n  }\n"): (typeof documents)["\n  mutation InsertActivity($friendUri: String!, $timestampMs: Float!) {\n    insertActivity(friendUri: $friendUri, timestampMs: $timestampMs)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($email: String!, $password: String!) {\n    register(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Register($email: String!, $password: String!) {\n    register(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpsertNotificationToken($token: String!, $deviceUniqueId: String!) {\n    upsertNotificationToken(token: $token, deviceUniqueId: $deviceUniqueId)\n  }\n"): (typeof documents)["\n  mutation UpsertNotificationToken($token: String!, $deviceUniqueId: String!) {\n    upsertNotificationToken(token: $token, deviceUniqueId: $deviceUniqueId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpsertSpotifyAuth(\n    $spdcCookie: String!\n    $accessToken: String!\n    $accessTokenExpirationTimestampMs: Float!\n  ) {\n    upsertSpotifyAuth(\n      spdcCookie: $spdcCookie\n      accessToken: $accessToken\n      accessTokenExpirationTimestampMs: $accessTokenExpirationTimestampMs\n    )\n  }\n"): (typeof documents)["\n  mutation UpsertSpotifyAuth(\n    $spdcCookie: String!\n    $accessToken: String!\n    $accessTokenExpirationTimestampMs: Float!\n  ) {\n    upsertSpotifyAuth(\n      spdcCookie: $spdcCookie\n      accessToken: $accessToken\n      accessTokenExpirationTimestampMs: $accessTokenExpirationTimestampMs\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DoesUserExist($email: String!) {\n    doesUserExist(email: $email)\n  }\n"): (typeof documents)["\n  query DoesUserExist($email: String!) {\n    doesUserExist(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetActivities {\n    getActivities {\n      friendUri\n    }\n  }\n"): (typeof documents)["\n  query GetActivities {\n    getActivities {\n      friendUri\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;