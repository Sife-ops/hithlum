/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query recentFeeds {\n    recentFeeds {\n      feedId\n      inputUrl\n      private\n      createdAt_isoDate\n\n      feedUrl\n      imageUrl\n      title\n      description\n      link\n    }\n  }\n": types.RecentFeedsDocument,
    "\n  query recentArticles {\n    recentArticles {\n      articleId\n      feedId\n\n      categories\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n\n      unread {\n        value\n      }\n    }\n  }\n": types.RecentArticlesDocument,
    "\n  mutation setUnread($articleId: String!, $value: Boolean!) {\n    setUnread(articleId: $articleId, value: $value) {\n      value\n    }\n  }\n": types.SetUnreadDocument,
    "\n  query article($articleId: String!) {\n    article(articleId: $articleId) {\n      articleId\n      feedId\n\n      categories\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n\n      unread {\n        value\n      }\n    }\n  }\n": types.ArticleDocument,
    "\n  query feed($feedId: String!) {\n    feed(feedId: $feedId) {\n      feedId\n      inputUrl\n      private\n      createdAt_isoDate\n\n      feedUrl\n      imageUrl\n      title\n      description\n      link\n\n      articles {\n        articleId\n        feedId\n\n        categories\n        content\n        contentSnippet\n        creator\n        guid\n        isoDate\n        link\n        pubDate\n        summary\n        title\n\n        unread {\n          value\n        }\n      }\n    }\n  }\n": types.FeedDocument,
    "\n  query hello {\n    hello\n  }\n": types.HelloDocument,
    "\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n": types.AddFeedDocument,
};

export function graphql(source: "\n  query recentFeeds {\n    recentFeeds {\n      feedId\n      inputUrl\n      private\n      createdAt_isoDate\n\n      feedUrl\n      imageUrl\n      title\n      description\n      link\n    }\n  }\n"): (typeof documents)["\n  query recentFeeds {\n    recentFeeds {\n      feedId\n      inputUrl\n      private\n      createdAt_isoDate\n\n      feedUrl\n      imageUrl\n      title\n      description\n      link\n    }\n  }\n"];
export function graphql(source: "\n  query recentArticles {\n    recentArticles {\n      articleId\n      feedId\n\n      categories\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n\n      unread {\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query recentArticles {\n    recentArticles {\n      articleId\n      feedId\n\n      categories\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n\n      unread {\n        value\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation setUnread($articleId: String!, $value: Boolean!) {\n    setUnread(articleId: $articleId, value: $value) {\n      value\n    }\n  }\n"): (typeof documents)["\n  mutation setUnread($articleId: String!, $value: Boolean!) {\n    setUnread(articleId: $articleId, value: $value) {\n      value\n    }\n  }\n"];
export function graphql(source: "\n  query article($articleId: String!) {\n    article(articleId: $articleId) {\n      articleId\n      feedId\n\n      categories\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n\n      unread {\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query article($articleId: String!) {\n    article(articleId: $articleId) {\n      articleId\n      feedId\n\n      categories\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n\n      unread {\n        value\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query feed($feedId: String!) {\n    feed(feedId: $feedId) {\n      feedId\n      inputUrl\n      private\n      createdAt_isoDate\n\n      feedUrl\n      imageUrl\n      title\n      description\n      link\n\n      articles {\n        articleId\n        feedId\n\n        categories\n        content\n        contentSnippet\n        creator\n        guid\n        isoDate\n        link\n        pubDate\n        summary\n        title\n\n        unread {\n          value\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query feed($feedId: String!) {\n    feed(feedId: $feedId) {\n      feedId\n      inputUrl\n      private\n      createdAt_isoDate\n\n      feedUrl\n      imageUrl\n      title\n      description\n      link\n\n      articles {\n        articleId\n        feedId\n\n        categories\n        content\n        contentSnippet\n        creator\n        guid\n        isoDate\n        link\n        pubDate\n        summary\n        title\n\n        unread {\n          value\n        }\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query hello {\n    hello\n  }\n"): (typeof documents)["\n  query hello {\n    hello\n  }\n"];
export function graphql(source: "\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n"): (typeof documents)["\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;