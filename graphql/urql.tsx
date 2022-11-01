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
  articles: Array<Article>;
  createdAt_isoDate: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  feedId: Scalars['ID'];
  feedUrl?: Maybe<Scalars['String']>;
  hasCustomArtwork: Scalars['Boolean'];
  image: Scalars['String'];
  inputUrl: Scalars['String'];
  latestArticle: Article;
  link?: Maybe<Scalars['String']>;
  subscribed: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFeed: Feed;
  myFeeds: Array<Feed>;
  setUnread: Unread;
  subscribe: Feed;
  unsubscribe: Feed;
  updateFeed: Scalars['String'];
};


export type MutationAddFeedArgs = {
  url: Scalars['String'];
};


export type MutationSetUnreadArgs = {
  articleId: Scalars['String'];
  value: Scalars['Boolean'];
};


export type MutationSubscribeArgs = {
  feedId: Scalars['String'];
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
  hello: Scalars['String'];
  recentArticles: Array<Article>;
  recentFeeds: Array<Feed>;
};


export type QueryArticleArgs = {
  articleId: Scalars['String'];
};


export type QueryFeedArgs = {
  feedId: Scalars['String'];
};

export type Unread = {
  __typename?: 'Unread';
  value: Scalars['Boolean'];
};

export type ArticleQueryVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type ArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', articleId: string, feedId: string, categories?: string | null, content?: string | null, contentSnippet?: string | null, creator?: string | null, guid?: string | null, isoDate?: string | null, link?: string | null, pubDate?: string | null, summary?: string | null, title?: string | null, unread: { __typename?: 'Unread', value: boolean } } };

export type SetUnreadMutationVariables = Exact<{
  articleId: Scalars['String'];
  value: Scalars['Boolean'];
}>;


export type SetUnreadMutation = { __typename?: 'Mutation', setUnread: { __typename?: 'Unread', value: boolean } };

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


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', feedId: string, inputUrl: string, image: string, title?: string | null, description?: string | null, feedUrl?: string | null, link?: string | null, subscribed: boolean, articles: Array<{ __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } }> } };

export type RecentFeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentFeedsQuery = { __typename?: 'Query', recentFeeds: Array<{ __typename?: 'Feed', feedId: string, image: string, title?: string | null, createdAt_isoDate: string, latestArticle: { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } } }> };

export type RecentArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentArticlesQuery = { __typename?: 'Query', recentArticles: Array<{ __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, feed: { __typename?: 'Feed', feedId: string, image: string, title?: string | null }, unread: { __typename?: 'Unread', value: boolean } }> };

export type AddFeedMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type AddFeedMutation = { __typename?: 'Mutation', addFeed: { __typename?: 'Feed', feedId: string } };

export type UpdateFeedMutationVariables = Exact<{
  feedId: Scalars['String'];
}>;


export type UpdateFeedMutation = { __typename?: 'Mutation', updateFeed: string };

export type MyFeedsMutationVariables = Exact<{ [key: string]: never; }>;


export type MyFeedsMutation = { __typename?: 'Mutation', myFeeds: Array<{ __typename?: 'Feed', feedId: string, image: string, title?: string | null, createdAt_isoDate: string, latestArticle: { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } } }> };

export type ArticlePreviewFieldsFragment = { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } };

export type FeedPreviewFieldsFragment = { __typename?: 'Feed', feedId: string, image: string, title?: string | null, createdAt_isoDate: string, latestArticle: { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

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
  createdAt_isoDate
  latestArticle {
    ...ArticlePreviewFields
  }
}
    ${ArticlePreviewFieldsFragmentDoc}`;
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
  }
}
    `;

export function useArticleQuery(options: Omit<Urql.UseQueryArgs<ArticleQueryVariables>, 'query'>) {
  return Urql.useQuery<ArticleQuery, ArticleQueryVariables>({ query: ArticleDocument, ...options });
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
    articles {
      ...ArticlePreviewFields
    }
  }
}
    ${ArticlePreviewFieldsFragmentDoc}`;

export function useFeedQuery(options: Omit<Urql.UseQueryArgs<FeedQueryVariables>, 'query'>) {
  return Urql.useQuery<FeedQuery, FeedQueryVariables>({ query: FeedDocument, ...options });
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
export const UpdateFeedDocument = gql`
    mutation updateFeed($feedId: String!) {
  updateFeed(feedId: $feedId)
}
    `;

export function useUpdateFeedMutation() {
  return Urql.useMutation<UpdateFeedMutation, UpdateFeedMutationVariables>(UpdateFeedDocument);
};
export const MyFeedsDocument = gql`
    mutation myFeeds {
  myFeeds {
    ...FeedPreviewFields
  }
}
    ${FeedPreviewFieldsFragmentDoc}`;

export function useMyFeedsMutation() {
  return Urql.useMutation<MyFeedsMutation, MyFeedsMutationVariables>(MyFeedsDocument);
};
export const HelloDocument = gql`
    query hello {
  hello
}
    `;

export function useHelloQuery(options?: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'>) {
  return Urql.useQuery<HelloQuery, HelloQueryVariables>({ query: HelloDocument, ...options });
};