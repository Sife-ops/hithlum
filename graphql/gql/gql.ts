/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  mutation setUnread($articleId: String!, $value: Boolean!) {\n    setUnread(articleId: $articleId, value: $value) {\n      value\n    }\n  }\n": types.SetUnreadDocument,
    "\n  query article($articleId: String!) {\n    article(articleId: $articleId) {\n      articleId\n      feedId\n\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n      enclosureUrl\n      enclosureType\n\n      unread {\n        value\n      }\n\n      feed {\n        ...FeedPreviewFields\n      }\n    }\n  }\n": types.ArticleDocument,
    "\n  mutation subscribe($feedId: String!) {\n    subscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n": types.SubscribeDocument,
    "\n  mutation unsubscribe($feedId: String!) {\n    unsubscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n": types.UnsubscribeDocument,
    "\n  query feed($feedId: String!) {\n    feed(feedId: $feedId) {\n      feedId\n      inputUrl\n\n      image\n      title\n      description\n      feedUrl\n      link\n\n      subscribed\n\n      addedByUser {\n        userId\n        username\n        discriminator\n        avatarUrl\n      }\n\n      articles {\n        ...ArticlePreviewFields\n      }\n    }\n  }\n": types.FeedDocument,
    "\n  mutation changeArtwork($feedId: String!, $artwork: String!) {\n    changeArtwork(feedId: $feedId, artwork: $artwork)\n  }\n": types.ChangeArtworkDocument,
    "\n  query friends {\n    friends\n  }\n": types.FriendsDocument,
    "\n  query friend($userId: String!) {\n    user(userId: $userId) {\n      ...UserPreviewFields\n    }\n  }\n": types.FriendDocument,
    "\n  query recentFeeds {\n    recentFeeds {\n      ...FeedPreviewFields\n    }\n  }\n": types.RecentFeedsDocument,
    "\n  query recentArticles {\n    recentArticles {\n      ...ArticlePreviewFields\n      feed {\n        feedId\n\n        image\n        title\n      }\n    }\n  }\n": types.RecentArticlesDocument,
    "\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n": types.AddFeedDocument,
    "\n  mutation syncFeed($feedId: String!) {\n    feed(feedId: $feedId) {\n      ...FeedPreviewFields\n    }\n  }\n": types.SyncFeedDocument,
    "\n  mutation updateFeed($feedId: String!) {\n    updateFeed(feedId: $feedId) {\n      ...FeedPreviewFields\n    }\n  }\n": types.UpdateFeedDocument,
    "\n  query myFeeds {\n    myFeeds {\n      ...FeedPreviewFields\n    }\n  }\n": types.MyFeedsDocument,
    "\n  mutation follow($userId: String!) {\n    follow(userId: $userId) {\n      following\n    }\n  }\n": types.FollowDocument,
    "\n  mutation unfollow($userId: String!) {\n    unfollow(userId: $userId) {\n      following\n    }\n  }\n": types.UnfollowDocument,
    "\n  query user($userId: String!) {\n    user(userId: $userId) {\n      userId\n      username\n      discriminator\n      avatarUrl\n\n      following\n\n      feeds {\n        ...FeedPreviewFields\n      }\n    }\n  }\n": types.UserDocument,
    "\n  fragment ArticlePreviewFields on Article {\n    articleId\n    feedId\n\n    title\n    summary\n    isoDate\n\n    unread {\n      value\n    }\n  }\n": types.ArticlePreviewFieldsFragmentDoc,
    "\n  fragment FeedPreviewFields on Feed {\n    feedId\n\n    image\n    title\n    createdAt\n\n    latestArticle {\n      ...ArticlePreviewFields\n    }\n  }\n": types.FeedPreviewFieldsFragmentDoc,
    "\n  fragment UserPreviewFields on User {\n    userId\n    username\n    discriminator\n    avatarUrl\n  }\n": types.UserPreviewFieldsFragmentDoc,
    "\n  query self {\n    user {\n      ...UserPreviewFields\n      roles\n    }\n  }\n": types.SelfDocument,
};

export function graphql(source: "\n  mutation setUnread($articleId: String!, $value: Boolean!) {\n    setUnread(articleId: $articleId, value: $value) {\n      value\n    }\n  }\n"): (typeof documents)["\n  mutation setUnread($articleId: String!, $value: Boolean!) {\n    setUnread(articleId: $articleId, value: $value) {\n      value\n    }\n  }\n"];
export function graphql(source: "\n  query article($articleId: String!) {\n    article(articleId: $articleId) {\n      articleId\n      feedId\n\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n      enclosureUrl\n      enclosureType\n\n      unread {\n        value\n      }\n\n      feed {\n        ...FeedPreviewFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query article($articleId: String!) {\n    article(articleId: $articleId) {\n      articleId\n      feedId\n\n      content\n      contentSnippet\n      creator\n      guid\n      isoDate\n      link\n      pubDate\n      summary\n      title\n      enclosureUrl\n      enclosureType\n\n      unread {\n        value\n      }\n\n      feed {\n        ...FeedPreviewFields\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation subscribe($feedId: String!) {\n    subscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n"): (typeof documents)["\n  mutation subscribe($feedId: String!) {\n    subscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n"];
export function graphql(source: "\n  mutation unsubscribe($feedId: String!) {\n    unsubscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n"): (typeof documents)["\n  mutation unsubscribe($feedId: String!) {\n    unsubscribe(feedId: $feedId) {\n      subscribed\n    }\n  }\n"];
export function graphql(source: "\n  query feed($feedId: String!) {\n    feed(feedId: $feedId) {\n      feedId\n      inputUrl\n\n      image\n      title\n      description\n      feedUrl\n      link\n\n      subscribed\n\n      addedByUser {\n        userId\n        username\n        discriminator\n        avatarUrl\n      }\n\n      articles {\n        ...ArticlePreviewFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query feed($feedId: String!) {\n    feed(feedId: $feedId) {\n      feedId\n      inputUrl\n\n      image\n      title\n      description\n      feedUrl\n      link\n\n      subscribed\n\n      addedByUser {\n        userId\n        username\n        discriminator\n        avatarUrl\n      }\n\n      articles {\n        ...ArticlePreviewFields\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation changeArtwork($feedId: String!, $artwork: String!) {\n    changeArtwork(feedId: $feedId, artwork: $artwork)\n  }\n"): (typeof documents)["\n  mutation changeArtwork($feedId: String!, $artwork: String!) {\n    changeArtwork(feedId: $feedId, artwork: $artwork)\n  }\n"];
export function graphql(source: "\n  query friends {\n    friends\n  }\n"): (typeof documents)["\n  query friends {\n    friends\n  }\n"];
export function graphql(source: "\n  query friend($userId: String!) {\n    user(userId: $userId) {\n      ...UserPreviewFields\n    }\n  }\n"): (typeof documents)["\n  query friend($userId: String!) {\n    user(userId: $userId) {\n      ...UserPreviewFields\n    }\n  }\n"];
export function graphql(source: "\n  query recentFeeds {\n    recentFeeds {\n      ...FeedPreviewFields\n    }\n  }\n"): (typeof documents)["\n  query recentFeeds {\n    recentFeeds {\n      ...FeedPreviewFields\n    }\n  }\n"];
export function graphql(source: "\n  query recentArticles {\n    recentArticles {\n      ...ArticlePreviewFields\n      feed {\n        feedId\n\n        image\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query recentArticles {\n    recentArticles {\n      ...ArticlePreviewFields\n      feed {\n        feedId\n\n        image\n        title\n      }\n    }\n  }\n"];
export function graphql(source: "\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n"): (typeof documents)["\n  mutation addFeed($url: String!) {\n    addFeed(url: $url) {\n      feedId\n    }\n  }\n"];
export function graphql(source: "\n  mutation syncFeed($feedId: String!) {\n    feed(feedId: $feedId) {\n      ...FeedPreviewFields\n    }\n  }\n"): (typeof documents)["\n  mutation syncFeed($feedId: String!) {\n    feed(feedId: $feedId) {\n      ...FeedPreviewFields\n    }\n  }\n"];
export function graphql(source: "\n  mutation updateFeed($feedId: String!) {\n    updateFeed(feedId: $feedId) {\n      ...FeedPreviewFields\n    }\n  }\n"): (typeof documents)["\n  mutation updateFeed($feedId: String!) {\n    updateFeed(feedId: $feedId) {\n      ...FeedPreviewFields\n    }\n  }\n"];
export function graphql(source: "\n  query myFeeds {\n    myFeeds {\n      ...FeedPreviewFields\n    }\n  }\n"): (typeof documents)["\n  query myFeeds {\n    myFeeds {\n      ...FeedPreviewFields\n    }\n  }\n"];
export function graphql(source: "\n  mutation follow($userId: String!) {\n    follow(userId: $userId) {\n      following\n    }\n  }\n"): (typeof documents)["\n  mutation follow($userId: String!) {\n    follow(userId: $userId) {\n      following\n    }\n  }\n"];
export function graphql(source: "\n  mutation unfollow($userId: String!) {\n    unfollow(userId: $userId) {\n      following\n    }\n  }\n"): (typeof documents)["\n  mutation unfollow($userId: String!) {\n    unfollow(userId: $userId) {\n      following\n    }\n  }\n"];
export function graphql(source: "\n  query user($userId: String!) {\n    user(userId: $userId) {\n      userId\n      username\n      discriminator\n      avatarUrl\n\n      following\n\n      feeds {\n        ...FeedPreviewFields\n      }\n    }\n  }\n"): (typeof documents)["\n  query user($userId: String!) {\n    user(userId: $userId) {\n      userId\n      username\n      discriminator\n      avatarUrl\n\n      following\n\n      feeds {\n        ...FeedPreviewFields\n      }\n    }\n  }\n"];
export function graphql(source: "\n  fragment ArticlePreviewFields on Article {\n    articleId\n    feedId\n\n    title\n    summary\n    isoDate\n\n    unread {\n      value\n    }\n  }\n"): (typeof documents)["\n  fragment ArticlePreviewFields on Article {\n    articleId\n    feedId\n\n    title\n    summary\n    isoDate\n\n    unread {\n      value\n    }\n  }\n"];
export function graphql(source: "\n  fragment FeedPreviewFields on Feed {\n    feedId\n\n    image\n    title\n    createdAt\n\n    latestArticle {\n      ...ArticlePreviewFields\n    }\n  }\n"): (typeof documents)["\n  fragment FeedPreviewFields on Feed {\n    feedId\n\n    image\n    title\n    createdAt\n\n    latestArticle {\n      ...ArticlePreviewFields\n    }\n  }\n"];
export function graphql(source: "\n  fragment UserPreviewFields on User {\n    userId\n    username\n    discriminator\n    avatarUrl\n  }\n"): (typeof documents)["\n  fragment UserPreviewFields on User {\n    userId\n    username\n    discriminator\n    avatarUrl\n  }\n"];
export function graphql(source: "\n  query self {\n    user {\n      ...UserPreviewFields\n      roles\n    }\n  }\n"): (typeof documents)["\n  query self {\n    user {\n      ...UserPreviewFields\n      roles\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;