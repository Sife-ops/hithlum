/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query hello {\n    hello\n  }\n": types.HelloDocument,
    "\n  query recentFeeds {\n    recentFeeds {\n      feedId\n      inputUrl\n\n      feedUrl\n      imageUrl\n      title\n      description\n      link\n    }\n  }\n": types.RecentFeedsDocument,
    "\n  query recentArticles {\n    recentArticles {\n      articleId\n      feedId\n      unread {\n        value\n      }\n    }\n  }\n": types.RecentArticlesDocument,
    "\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n": types.AddFeedDocument,
};

export function graphql(source: "\n  query hello {\n    hello\n  }\n"): (typeof documents)["\n  query hello {\n    hello\n  }\n"];
export function graphql(source: "\n  query recentFeeds {\n    recentFeeds {\n      feedId\n      inputUrl\n\n      feedUrl\n      imageUrl\n      title\n      description\n      link\n    }\n  }\n"): (typeof documents)["\n  query recentFeeds {\n    recentFeeds {\n      feedId\n      inputUrl\n\n      feedUrl\n      imageUrl\n      title\n      description\n      link\n    }\n  }\n"];
export function graphql(source: "\n  query recentArticles {\n    recentArticles {\n      articleId\n      feedId\n      unread {\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query recentArticles {\n    recentArticles {\n      articleId\n      feedId\n      unread {\n        value\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n"): (typeof documents)["\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;