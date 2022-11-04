import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Article = {
  __typename?: 'Article';
  articleId: Scalars['ID'];
  categories?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  contentSnippet?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  feed: Feed;
  feedId: Scalars['String'];
  guid?: Maybe<Scalars['String']>;
  isoDate?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  pubDate?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  unread: Unread;
};

export type Feed = {
  __typename?: 'Feed';
  addedByUser: User;
  articles: Array<Article>;
  createdAt: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  feedId: Scalars['ID'];
  feedUrl?: Maybe<Scalars['String']>;
  hasCustomArtwork: Scalars['Boolean'];
  image: Scalars['String'];
  inputUrl: Scalars['String'];
  latestArticle?: Maybe<Article>;
  link?: Maybe<Scalars['String']>;
  subscribed: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFeed: Feed;
  feed: Feed;
  follow: User;
  myFeeds: Array<Feed>;
  setUnread: Unread;
  subscribe: Feed;
  unfollow: User;
  unsubscribe: Feed;
  updateFeed: Feed;
};


export type MutationAddFeedArgs = {
  url: Scalars['String'];
};


export type MutationFeedArgs = {
  feedId: Scalars['String'];
};


export type MutationFollowArgs = {
  userId: Scalars['String'];
};


export type MutationSetUnreadArgs = {
  articleId: Scalars['String'];
  value: Scalars['Boolean'];
};


export type MutationSubscribeArgs = {
  feedId: Scalars['String'];
};


export type MutationUnfollowArgs = {
  userId: Scalars['String'];
};


export type MutationUnsubscribeArgs = {
  feedId: Scalars['String'];
};


export type MutationUpdateFeedArgs = {
  feedId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  article: Article;
  feed: Feed;
  friends: Array<Scalars['String']>;
  hello: Scalars['String'];
  myFeeds: Array<Feed>;
  recentArticles: Array<Article>;
  recentFeeds: Array<Feed>;
  user: User;
};


export type QueryArticleArgs = {
  articleId: Scalars['String'];
};


export type QueryFeedArgs = {
  feedId: Scalars['String'];
};


export type QueryUserArgs = {
  userId?: InputMaybe<Scalars['String']>;
};

export type Unread = {
  __typename?: 'Unread';
  value: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
  discriminator: Scalars['String'];
  feeds: Array<Feed>;
  following: Scalars['Boolean'];
  userId: Scalars['ID'];
  username: Scalars['String'];
};

export type SelfQueryVariables = Exact<{ [key: string]: never; }>;


export type SelfQuery = { __typename?: 'Query', user: { __typename?: 'User', userId: string, username: string, discriminator: string, avatarUrl: string } };

export type SetUnreadMutationVariables = Exact<{
  articleId: Scalars['String'];
  value: Scalars['Boolean'];
}>;


export type SetUnreadMutation = { __typename?: 'Mutation', setUnread: { __typename?: 'Unread', value: boolean } };

export type ArticleQueryVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type ArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', articleId: string, feedId: string, categories?: string | null, content?: string | null, contentSnippet?: string | null, creator?: string | null, guid?: string | null, isoDate?: string | null, link?: string | null, pubDate?: string | null, summary?: string | null, title?: string | null, unread: { __typename?: 'Unread', value: boolean }, feed: { __typename?: 'Feed', feedId: string, image: string, title?: string | null, createdAt: string, latestArticle?: { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } } | null } } };

export type SubscribeMutationVariables = Exact<{
  feedId: Scalars['String'];
}>;


export type SubscribeMutation = { __typename?: 'Mutation', subscribe: { __typename?: 'Feed', subscribed: boolean } };

export type UnsubscribeMutationVariables = Exact<{
  feedId: Scalars['String'];
}>;


export type UnsubscribeMutation = { __typename?: 'Mutation', unsubscribe: { __typename?: 'Feed', subscribed: boolean } };

export type FeedQueryVariables = Exact<{
  feedId: Scalars['String'];
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', feedId: string, inputUrl: string, image: string, title?: string | null, description?: string | null, feedUrl?: string | null, link?: string | null, subscribed: boolean, addedByUser: { __typename?: 'User', userId: string, username: string, discriminator: string, avatarUrl: string }, articles: Array<{ __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } }> } };

export type FriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsQuery = { __typename?: 'Query', friends: Array<string> };

export type UserPreviewFieldsFragment = { __typename?: 'User', userId: string, username: string, discriminator: string, avatarUrl: string };

export type FriendQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FriendQuery = { __typename?: 'Query', user: { __typename?: 'User', userId: string, username: string, discriminator: string, avatarUrl: string } };

export type RecentFeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentFeedsQuery = { __typename?: 'Query', recentFeeds: Array<{ __typename?: 'Feed', feedId: string, image: string, title?: string | null, createdAt: string, latestArticle?: { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } } | null }> };

export type RecentArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentArticlesQuery = { __typename?: 'Query', recentArticles: Array<{ __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, feed: { __typename?: 'Feed', feedId: string, image: string, title?: string | null }, unread: { __typename?: 'Unread', value: boolean } }> };

export type AddFeedMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type AddFeedMutation = { __typename?: 'Mutation', addFeed: { __typename?: 'Feed', feedId: string } };

export type SyncFeedMutationVariables = Exact<{
  feedId: Scalars['String'];
}>;


export type SyncFeedMutation = { __typename?: 'Mutation', feed: { __typename?: 'Feed', feedId: string, image: string, title?: string | null, createdAt: string, latestArticle?: { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } } | null } };

export type UpdateFeedMutationVariables = Exact<{
  feedId: Scalars['String'];
}>;


export type UpdateFeedMutation = { __typename?: 'Mutation', updateFeed: { __typename?: 'Feed', feedId: string, image: string, title?: string | null, createdAt: string, latestArticle?: { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } } | null } };

export type MyFeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFeedsQuery = { __typename?: 'Query', myFeeds: Array<{ __typename?: 'Feed', feedId: string, image: string, title?: string | null, createdAt: string, latestArticle?: { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } } | null }> };

export type FollowMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'User', following: boolean } };

export type UnfollowMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: { __typename?: 'User', following: boolean } };

export type UserQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', userId: string, username: string, discriminator: string, avatarUrl: string, following: boolean, feeds: Array<{ __typename?: 'Feed', feedId: string, image: string, title?: string | null, createdAt: string, latestArticle?: { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } } | null }> } };

export type ArticlePreviewFieldsFragment = { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } };

export type FeedPreviewFieldsFragment = { __typename?: 'Feed', feedId: string, image: string, title?: string | null, createdAt: string, latestArticle?: { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } } | null };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export const UserPreviewFieldsFragmentDoc = gql`
    fragment UserPreviewFields on User {
  userId
  username
  discriminator
  avatarUrl
}
    `;
export const ArticlePreviewFieldsFragmentDoc = gql`
    fragment ArticlePreviewFields on Article {
  articleId
  feedId
  title
  summary
  isoDate
  unread {
    value
  }
}
    `;
export const FeedPreviewFieldsFragmentDoc = gql`
    fragment FeedPreviewFields on Feed {
  feedId
  image
  title
  createdAt
  latestArticle {
    ...ArticlePreviewFields
  }
}
    ${ArticlePreviewFieldsFragmentDoc}`;
export const SelfDocument = gql`
    query self {
  user {
    ...UserPreviewFields
  }
}
    ${UserPreviewFieldsFragmentDoc}`;

export function useSelfQuery(options?: Omit<Urql.UseQueryArgs<SelfQueryVariables>, 'query'>) {
  return Urql.useQuery<SelfQuery, SelfQueryVariables>({ query: SelfDocument, ...options });
};
export const SetUnreadDocument = gql`
    mutation setUnread($articleId: String!, $value: Boolean!) {
  setUnread(articleId: $articleId, value: $value) {
    value
  }
}
    `;

export function useSetUnreadMutation() {
  return Urql.useMutation<SetUnreadMutation, SetUnreadMutationVariables>(SetUnreadDocument);
};
export const ArticleDocument = gql`
    query article($articleId: String!) {
  article(articleId: $articleId) {
    articleId
    feedId
    categories
    content
    contentSnippet
    creator
    guid
    isoDate
    link
    pubDate
    summary
    title
    unread {
      value
    }
    feed {
      ...FeedPreviewFields
    }
  }
}
    ${FeedPreviewFieldsFragmentDoc}`;

export function useArticleQuery(options: Omit<Urql.UseQueryArgs<ArticleQueryVariables>, 'query'>) {
  return Urql.useQuery<ArticleQuery, ArticleQueryVariables>({ query: ArticleDocument, ...options });
};
export const SubscribeDocument = gql`
    mutation subscribe($feedId: String!) {
  subscribe(feedId: $feedId) {
    subscribed
  }
}
    `;

export function useSubscribeMutation() {
  return Urql.useMutation<SubscribeMutation, SubscribeMutationVariables>(SubscribeDocument);
};
export const UnsubscribeDocument = gql`
    mutation unsubscribe($feedId: String!) {
  unsubscribe(feedId: $feedId) {
    subscribed
  }
}
    `;

export function useUnsubscribeMutation() {
  return Urql.useMutation<UnsubscribeMutation, UnsubscribeMutationVariables>(UnsubscribeDocument);
};
export const FeedDocument = gql`
    query feed($feedId: String!) {
  feed(feedId: $feedId) {
    feedId
    inputUrl
    image
    title
    description
    feedUrl
    link
    subscribed
    addedByUser {
      userId
      username
      discriminator
      avatarUrl
    }
    articles {
      ...ArticlePreviewFields
    }
  }
}
    ${ArticlePreviewFieldsFragmentDoc}`;

export function useFeedQuery(options: Omit<Urql.UseQueryArgs<FeedQueryVariables>, 'query'>) {
  return Urql.useQuery<FeedQuery, FeedQueryVariables>({ query: FeedDocument, ...options });
};
export const FriendsDocument = gql`
    query friends {
  friends
}
    `;

export function useFriendsQuery(options?: Omit<Urql.UseQueryArgs<FriendsQueryVariables>, 'query'>) {
  return Urql.useQuery<FriendsQuery, FriendsQueryVariables>({ query: FriendsDocument, ...options });
};
export const FriendDocument = gql`
    query friend($userId: String!) {
  user(userId: $userId) {
    ...UserPreviewFields
  }
}
    ${UserPreviewFieldsFragmentDoc}`;

export function useFriendQuery(options: Omit<Urql.UseQueryArgs<FriendQueryVariables>, 'query'>) {
  return Urql.useQuery<FriendQuery, FriendQueryVariables>({ query: FriendDocument, ...options });
};
export const RecentFeedsDocument = gql`
    query recentFeeds {
  recentFeeds {
    ...FeedPreviewFields
  }
}
    ${FeedPreviewFieldsFragmentDoc}`;

export function useRecentFeedsQuery(options?: Omit<Urql.UseQueryArgs<RecentFeedsQueryVariables>, 'query'>) {
  return Urql.useQuery<RecentFeedsQuery, RecentFeedsQueryVariables>({ query: RecentFeedsDocument, ...options });
};
export const RecentArticlesDocument = gql`
    query recentArticles {
  recentArticles {
    ...ArticlePreviewFields
    feed {
      feedId
      image
      title
    }
  }
}
    ${ArticlePreviewFieldsFragmentDoc}`;

export function useRecentArticlesQuery(options?: Omit<Urql.UseQueryArgs<RecentArticlesQueryVariables>, 'query'>) {
  return Urql.useQuery<RecentArticlesQuery, RecentArticlesQueryVariables>({ query: RecentArticlesDocument, ...options });
};
export const AddFeedDocument = gql`
    mutation addFeed($url: String!) {
  addFeed(url: $url) {
    feedId
  }
}
    `;

export function useAddFeedMutation() {
  return Urql.useMutation<AddFeedMutation, AddFeedMutationVariables>(AddFeedDocument);
};
export const SyncFeedDocument = gql`
    mutation syncFeed($feedId: String!) {
  feed(feedId: $feedId) {
    ...FeedPreviewFields
  }
}
    ${FeedPreviewFieldsFragmentDoc}`;

export function useSyncFeedMutation() {
  return Urql.useMutation<SyncFeedMutation, SyncFeedMutationVariables>(SyncFeedDocument);
};
export const UpdateFeedDocument = gql`
    mutation updateFeed($feedId: String!) {
  updateFeed(feedId: $feedId) {
    ...FeedPreviewFields
  }
}
    ${FeedPreviewFieldsFragmentDoc}`;

export function useUpdateFeedMutation() {
  return Urql.useMutation<UpdateFeedMutation, UpdateFeedMutationVariables>(UpdateFeedDocument);
};
export const MyFeedsDocument = gql`
    query myFeeds {
  myFeeds {
    ...FeedPreviewFields
  }
}
    ${FeedPreviewFieldsFragmentDoc}`;

export function useMyFeedsQuery(options?: Omit<Urql.UseQueryArgs<MyFeedsQueryVariables>, 'query'>) {
  return Urql.useQuery<MyFeedsQuery, MyFeedsQueryVariables>({ query: MyFeedsDocument, ...options });
};
export const FollowDocument = gql`
    mutation follow($userId: String!) {
  follow(userId: $userId) {
    following
  }
}
    `;

export function useFollowMutation() {
  return Urql.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument);
};
export const UnfollowDocument = gql`
    mutation unfollow($userId: String!) {
  unfollow(userId: $userId) {
    following
  }
}
    `;

export function useUnfollowMutation() {
  return Urql.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument);
};
export const UserDocument = gql`
    query user($userId: String!) {
  user(userId: $userId) {
    userId
    username
    discriminator
    avatarUrl
    following
    feeds {
      ...FeedPreviewFields
    }
  }
}
    ${FeedPreviewFieldsFragmentDoc}`;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
};
export const HelloDocument = gql`
    query hello {
  hello
}
    `;

export function useHelloQuery(options?: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'>) {
  return Urql.useQuery<HelloQuery, HelloQueryVariables>({ query: HelloDocument, ...options });
};