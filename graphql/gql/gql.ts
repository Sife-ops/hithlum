/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query article($articleId: String!) {\n    article(articleId: $articleId) {\n      articleId\n      feedId\n\n      categories\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n\n      unread {\n        value\n      }\n    }\n  }\n": types.ArticleDocument,
    "\n  mutation setUnread($articleId: String!, $value: Boolean!) {\n    setUnread(articleId: $articleId, value: $value) {\n      value\n    }\n  }\n": types.SetUnreadDocument,
    "\n  mutation subscribe($feedId: String!) {\n    subscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n": types.SubscribeDocument,
    "\n  mutation unsubscribe($feedId: String!) {\n    unsubscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n": types.UnsubscribeDocument,
    "\n  query feed($feedId: String!) {\n    feed(feedId: $feedId) {\n      feedId\n      inputUrl\n\n      image\n      title\n      description\n      feedUrl\n      link\n\n      subscribed\n\n      articles {\n        ...ArticlePreviewFields\n      }\n    }\n  }\n": types.FeedDocument,
    "\n  query recentFeeds {\n    recentFeeds {\n      ...FeedPreviewFields\n    }\n  }\n": types.RecentFeedsDocument,
    "\n  query recentArticles {\n    recentArticles {\n      ...ArticlePreviewFields\n      feed {\n        feedId\n\n        image\n        title\n      }\n    }\n  }\n": types.RecentArticlesDocument,
    "\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n": types.AddFeedDocument,
    "\n  mutation updateFeed($feedId: String!) {\n    updateFeed(feedId: $feedId)\n  }\n": types.UpdateFeedDocument,
    "\n  mutation myFeeds {\n    myFeeds {\n      ...FeedPreviewFields\n    }\n  }\n": types.MyFeedsDocument,
    "\n  fragment ArticlePreviewFields on Article {\n    articleId\n    feedId\n\n    title\n    summary\n    isoDate\n\n    unread {\n      value\n    }\n  }\n": types.ArticlePreviewFieldsFragmentDoc,
    "\n  fragment FeedPreviewFields on Feed {\n    feedId\n\n    image\n    title\n    createdAt_isoDate\n\n    latestArticle {\n      ...ArticlePreviewFields\n    }\n  }\n": types.FeedPreviewFieldsFragmentDoc,
    "\n  query hello {\n    hello\n  }\n": types.HelloDocument,
};

export function graphql(source: "\n  query article($articleId: String!) {\n    article(articleId: $articleId) {\n      articleId\n      feedId\n\n      categories\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n\n      unread {\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  query article($articleId: String!) {\n    article(articleId: $articleId) {\n      articleId\n      feedId\n\n      categories\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n\n      unread {\n        value\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation setUnread($articleId: String!, $value: Boolean!) {\n    setUnread(articleId: $articleId, value: $value) {\n      value\n    }\n  }\n"): (typeof documents)["\n  mutation setUnread($articleId: String!, $value: Boolean!) {\n    setUnread(articleId: $articleId, value: $value) {\n      value\n    }\n  }\n"];
export function graphql(source: "\n  mutation subscribe($feedId: String!) {\n    subscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n"): (typeof documents)["\n  mutation subscribe($feedId: String!) {\n    subscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n"];
export function graphql(source: "\n  mutation unsubscribe($feedId: String!) {\n    unsubscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n"): (typeof documents)["\n  mutation unsubscribe($feedId: String!) {\n    unsubscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n"];
export function graphql(source: "\n  query feed($feedId: String!) {\n    feed(feedId: $feedId) {\n      feedId\n      inputUrl\n\n      image\n      title\n      description\n      feedUrl\n      link\n\n      subscribed\n\n      articles {\n        ...ArticlePreviewFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query feed($feedId: String!) {\n    feed(feedId: $feedId) {\n      feedId\n      inputUrl\n\n      image\n      title\n      description\n      feedUrl\n      link\n\n      subscribed\n\n      articles {\n        ...ArticlePreviewFields\n      }\n    }\n  }\n"];
export function graphql(source: "\n  query recentFeeds {\n    recentFeeds {\n      ...FeedPreviewFields\n    }\n  }\n"): (typeof documents)["\n  query recentFeeds {\n    recentFeeds {\n      ...FeedPreviewFields\n    }\n  }\n"];
export function graphql(source: "\n  query recentArticles {\n    recentArticles {\n      ...ArticlePreviewFields\n      feed {\n        feedId\n\n        image\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query recentArticles {\n    recentArticles {\n      ...ArticlePreviewFields\n      feed {\n        feedId\n\n        image\n        title\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n"): (typeof documents)["\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n"];
export function graphql(source: "\n  mutation updateFeed($feedId: String!) {\n    updateFeed(feedId: $feedId)\n  }\n"): (typeof documents)["\n  mutation updateFeed($feedId: String!) {\n    updateFeed(feedId: $feedId)\n  }\n"];
export function graphql(source: "\n  mutation myFeeds {\n    myFeeds {\n      ...FeedPreviewFields\n    }\n  }\n"): (typeof documents)["\n  mutation myFeeds {\n    myFeeds {\n      ...FeedPreviewFields\n    }\n  }\n"];
export function graphql(source: "\n  fragment ArticlePreviewFields on Article {\n    articleId\n    feedId\n\n    title\n    summary\n    isoDate\n\n    unread {\n      value\n    }\n  }\n"): (typeof documents)["\n  fragment ArticlePreviewFields on Article {\n    articleId\n    feedId\n\n    title\n    summary\n    isoDate\n\n    unread {\n      value\n    }\n  }\n"];
export function graphql(source: "\n  fragment FeedPreviewFields on Feed {\n    feedId\n\n    image\n    title\n    createdAt_isoDate\n\n    latestArticle {\n      ...ArticlePreviewFields\n    }\n  }\n"): (typeof documents)["\n  fragment FeedPreviewFields on Feed {\n    feedId\n\n    image\n    title\n    createdAt_isoDate\n\n    latestArticle {\n      ...ArticlePreviewFields\n    }\n  }\n"];
export function graphql(source: "\n  query hello {\n    hello\n  }\n"): (typeof documents)["\n  query hello {\n    hello\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;