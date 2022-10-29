/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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


export const HelloDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"hello"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hello"}}]}}]} as unknown as DocumentNode<HelloQuery, HelloQueryVariables>;
export const RecentFeedsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recentFeeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recentFeeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedId"}},{"kind":"Field","name":{"kind":"Name","value":"inputUrl"}},{"kind":"Field","name":{"kind":"Name","value":"private"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt_isoDate"}},{"kind":"Field","name":{"kind":"Name","value":"feedUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]} as unknown as DocumentNode<RecentFeedsQuery, RecentFeedsQueryVariables>;
export const RecentArticlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recentArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recentArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articleId"}},{"kind":"Field","name":{"kind":"Name","value":"feedId"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"contentSnippet"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"enclosure"}},{"kind":"Field","name":{"kind":"Name","value":"guid"}},{"kind":"Field","name":{"kind":"Name","value":"isoDate"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"pubDate"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<RecentArticlesQuery, RecentArticlesQueryVariables>;
export const AddFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedId"}}]}}]}}]} as unknown as DocumentNode<AddFeedMutation, AddFeedMutationVariables>;