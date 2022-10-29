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
  enclosure?: Maybe<Scalars['String']>;
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
  imageUrl?: Maybe<Scalars['String']>;
  inputUrl: Scalars['String'];
  link?: Maybe<Scalars['String']>;
  private: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFeed: Feed;
  setUnread: Unread;
};


export type MutationAddFeedArgs = {
  url: Scalars['String'];
};


export type MutationSetUnreadArgs = {
  articleId: Scalars['String'];
  feedId: Scalars['String'];
  value: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  feed: Feed;
  feeds: Array<Feed>;
  hello: Scalars['String'];
  recentArticles: Array<Article>;
  recentFeeds: Array<Feed>;
};


export type QueryFeedArgs = {
  feedId: Scalars['String'];
};

export type Unread = {
  __typename?: 'Unread';
  value: Scalars['Boolean'];
};

export type FeedQueryVariables = Exact<{
  feedId: Scalars['String'];
}>;


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', feedId: string, inputUrl: string, private: boolean, createdAt_isoDate: string, feedUrl?: string | null, imageUrl?: string | null, title?: string | null, description?: string | null, link?: string | null, articles: Array<{ __typename?: 'Article', articleId: string, feedId: string, categories?: string | null, content?: string | null, contentSnippet?: string | null, creator?: string | null, enclosure?: string | null, guid?: string | null, isoDate?: string | null, link?: string | null, pubDate?: string | null, summary?: string | null, title?: string | null, unread: { __typename?: 'Unread', value: boolean } }> } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type RecentFeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentFeedsQuery = { __typename?: 'Query', recentFeeds: Array<{ __typename?: 'Feed', feedId: string, inputUrl: string, private: boolean, createdAt_isoDate: string, feedUrl?: string | null, imageUrl?: string | null, title?: string | null, description?: string | null, link?: string | null }> };

export type RecentArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentArticlesQuery = { __typename?: 'Query', recentArticles: Array<{ __typename?: 'Article', articleId: string, feedId: string, categories?: string | null, content?: string | null, contentSnippet?: string | null, creator?: string | null, enclosure?: string | null, guid?: string | null, isoDate?: string | null, link?: string | null, pubDate?: string | null, summary?: string | null, title?: string | null }> };

export type AddFeedMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type AddFeedMutation = { __typename?: 'Mutation', addFeed: { __typename?: 'Feed', feedId: string } };


export const FeedDocument = gql`
    query feed($feedId: String!) {
  feed(feedId: $feedId) {
    feedId
    inputUrl
    private
    createdAt_isoDate
    feedUrl
    imageUrl
    title
    description
    link
    articles {
      articleId
      feedId
      categories
      content
      contentSnippet
      creator
      enclosure
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
}
    `;

export function useFeedQuery(options: Omit<Urql.UseQueryArgs<FeedQueryVariables>, 'query'>) {
  return Urql.useQuery<FeedQuery, FeedQueryVariables>({ query: FeedDocument, ...options });
};
export const HelloDocument = gql`
    query hello {
  hello
}
    `;

export function useHelloQuery(options?: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'>) {
  return Urql.useQuery<HelloQuery, HelloQueryVariables>({ query: HelloDocument, ...options });
};
export const RecentFeedsDocument = gql`
    query recentFeeds {
  recentFeeds {
    feedId
    inputUrl
    private
    createdAt_isoDate
    feedUrl
    imageUrl
    title
    description
    link
  }
}
    `;

export function useRecentFeedsQuery(options?: Omit<Urql.UseQueryArgs<RecentFeedsQueryVariables>, 'query'>) {
  return Urql.useQuery<RecentFeedsQuery, RecentFeedsQueryVariables>({ query: RecentFeedsDocument, ...options });
};
export const RecentArticlesDocument = gql`
    query recentArticles {
  recentArticles {
    articleId
    feedId
    categories
    content
    contentSnippet
    creator
    enclosure
    guid
    isoDate
    link
    pubDate
    summary
    title
  }
}
    `;

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