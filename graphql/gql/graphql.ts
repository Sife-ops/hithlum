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
  content?: Maybe<Scalars['String']>;
  contentSnippet?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  enclosureLength?: Maybe<Scalars['String']>;
  enclosureType?: Maybe<Scalars['String']>;
  enclosureUrl?: Maybe<Scalars['String']>;
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
  changeArtwork: Scalars['Boolean'];
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


export type MutationChangeArtworkArgs = {
  artwork: Scalars['String'];
  feedId: Scalars['String'];
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
  roles: Array<Scalars['String']>;
  userId: Scalars['ID'];
  username: Scalars['String'];
};

export type AddFeedMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type AddFeedMutation = { __typename?: 'Mutation', addFeed: { __typename?: 'Feed', feedId: string, image: string, title?: string | null, description?: string | null } };

export type SyncFeedMutationVariables = Exact<{
  feedId: Scalars['String'];
}>;


export type SyncFeedMutation = { __typename?: 'Mutation', feed: (
    { __typename?: 'Feed' }
    & { ' $fragmentRefs'?: { 'FeedPreviewFieldsFragment': FeedPreviewFieldsFragment } }
  ) };

export type SetUnreadMutationVariables = Exact<{
  articleId: Scalars['String'];
  value: Scalars['Boolean'];
}>;


export type SetUnreadMutation = { __typename?: 'Mutation', setUnread: { __typename?: 'Unread', value: boolean } };

export type ArticleQueryVariables = Exact<{
  articleId: Scalars['String'];
}>;


export type ArticleQuery = { __typename?: 'Query', article: { __typename?: 'Article', articleId: string, feedId: string, content?: string | null, contentSnippet?: string | null, creator?: string | null, guid?: string | null, isoDate?: string | null, link?: string | null, pubDate?: string | null, summary?: string | null, title?: string | null, enclosureUrl?: string | null, enclosureType?: string | null, unread: { __typename?: 'Unread', value: boolean }, feed: (
      { __typename?: 'Feed' }
      & { ' $fragmentRefs'?: { 'FeedPreviewFieldsFragment': FeedPreviewFieldsFragment } }
    ) } };

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


export type FeedQuery = { __typename?: 'Query', feed: { __typename?: 'Feed', feedId: string, inputUrl: string, image: string, title?: string | null, description?: string | null, feedUrl?: string | null, link?: string | null, subscribed: boolean, addedByUser: { __typename?: 'User', userId: string, username: string, discriminator: string, avatarUrl: string }, articles: Array<(
      { __typename?: 'Article' }
      & { ' $fragmentRefs'?: { 'ArticlePreviewFieldsFragment': ArticlePreviewFieldsFragment } }
    )> } };

export type ChangeArtworkMutationVariables = Exact<{
  feedId: Scalars['String'];
  artwork: Scalars['String'];
}>;


export type ChangeArtworkMutation = { __typename?: 'Mutation', changeArtwork: boolean };

export type FriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsQuery = { __typename?: 'Query', friends: Array<string> };

export type FriendQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FriendQuery = { __typename?: 'Query', user: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserPreviewFieldsFragment': UserPreviewFieldsFragment } }
  ) };

export type RecentFeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentFeedsQuery = { __typename?: 'Query', recentFeeds: Array<(
    { __typename?: 'Feed' }
    & { ' $fragmentRefs'?: { 'FeedPreviewFieldsFragment': FeedPreviewFieldsFragment } }
  )> };

export type RecentArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentArticlesQuery = { __typename?: 'Query', recentArticles: Array<(
    { __typename?: 'Article', feed: { __typename?: 'Feed', feedId: string, image: string, title?: string | null } }
    & { ' $fragmentRefs'?: { 'ArticlePreviewFieldsFragment': ArticlePreviewFieldsFragment } }
  )> };

export type UpdateFeedMutationVariables = Exact<{
  feedId: Scalars['String'];
}>;


export type UpdateFeedMutation = { __typename?: 'Mutation', updateFeed: (
    { __typename?: 'Feed' }
    & { ' $fragmentRefs'?: { 'FeedPreviewFieldsFragment': FeedPreviewFieldsFragment } }
  ) };

export type MyFeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyFeedsQuery = { __typename?: 'Query', myFeeds: Array<(
    { __typename?: 'Feed' }
    & { ' $fragmentRefs'?: { 'FeedPreviewFieldsFragment': FeedPreviewFieldsFragment } }
  )> };

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


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', userId: string, username: string, discriminator: string, avatarUrl: string, following: boolean, feeds: Array<(
      { __typename?: 'Feed' }
      & { ' $fragmentRefs'?: { 'FeedPreviewFieldsFragment': FeedPreviewFieldsFragment } }
    )> } };

export type ArticlePreviewFieldsFragment = { __typename?: 'Article', articleId: string, feedId: string, title?: string | null, summary?: string | null, isoDate?: string | null, unread: { __typename?: 'Unread', value: boolean } } & { ' $fragmentName'?: 'ArticlePreviewFieldsFragment' };

export type FeedPreviewFieldsFragment = { __typename?: 'Feed', feedId: string, image: string, title?: string | null, createdAt: string, latestArticle?: (
    { __typename?: 'Article' }
    & { ' $fragmentRefs'?: { 'ArticlePreviewFieldsFragment': ArticlePreviewFieldsFragment } }
  ) | null } & { ' $fragmentName'?: 'FeedPreviewFieldsFragment' };

export type UserPreviewFieldsFragment = { __typename?: 'User', userId: string, username: string, discriminator: string, avatarUrl: string } & { ' $fragmentName'?: 'UserPreviewFieldsFragment' };

export type SelfQueryVariables = Exact<{ [key: string]: never; }>;


export type SelfQuery = { __typename?: 'Query', user: (
    { __typename?: 'User', roles: Array<string> }
    & { ' $fragmentRefs'?: { 'UserPreviewFieldsFragment': UserPreviewFieldsFragment } }
  ) };

export const ArticlePreviewFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArticlePreviewFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articleId"}},{"kind":"Field","name":{"kind":"Name","value":"feedId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"isoDate"}},{"kind":"Field","name":{"kind":"Name","value":"unread"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<ArticlePreviewFieldsFragment, unknown>;
export const FeedPreviewFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeedPreviewFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Feed"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedId"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"latestArticle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArticlePreviewFields"}}]}}]}},...ArticlePreviewFieldsFragmentDoc.definitions]} as unknown as DocumentNode<FeedPreviewFieldsFragment, unknown>;
export const UserPreviewFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPreviewFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"discriminator"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<UserPreviewFieldsFragment, unknown>;
export const AddFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedId"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<AddFeedMutation, AddFeedMutationVariables>;
export const SyncFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"syncFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeedPreviewFields"}}]}}]}},...FeedPreviewFieldsFragmentDoc.definitions]} as unknown as DocumentNode<SyncFeedMutation, SyncFeedMutationVariables>;
export const SetUnreadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setUnread"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"value"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setUnread"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"articleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}}},{"kind":"Argument","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"value"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<SetUnreadMutation, SetUnreadMutationVariables>;
export const ArticleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"article"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"article"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"articleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"articleId"}},{"kind":"Field","name":{"kind":"Name","value":"feedId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"contentSnippet"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"guid"}},{"kind":"Field","name":{"kind":"Name","value":"isoDate"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"pubDate"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"enclosureUrl"}},{"kind":"Field","name":{"kind":"Name","value":"enclosureType"}},{"kind":"Field","name":{"kind":"Name","value":"unread"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"feed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeedPreviewFields"}}]}}]}}]}},...FeedPreviewFieldsFragmentDoc.definitions]} as unknown as DocumentNode<ArticleQuery, ArticleQueryVariables>;
export const SubscribeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"subscribe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscribe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscribed"}}]}}]}}]} as unknown as DocumentNode<SubscribeMutation, SubscribeMutationVariables>;
export const UnsubscribeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unsubscribe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unsubscribe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscribed"}}]}}]}}]} as unknown as DocumentNode<UnsubscribeMutation, UnsubscribeMutationVariables>;
export const FeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"feed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedId"}},{"kind":"Field","name":{"kind":"Name","value":"inputUrl"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"feedUrl"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"subscribed"}},{"kind":"Field","name":{"kind":"Name","value":"addedByUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"discriminator"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"articles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArticlePreviewFields"}}]}}]}}]}},...ArticlePreviewFieldsFragmentDoc.definitions]} as unknown as DocumentNode<FeedQuery, FeedQueryVariables>;
export const ChangeArtworkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changeArtwork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artwork"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeArtwork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}}},{"kind":"Argument","name":{"kind":"Name","value":"artwork"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artwork"}}}]}]}}]} as unknown as DocumentNode<ChangeArtworkMutation, ChangeArtworkMutationVariables>;
export const FriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"friends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"friends"}}]}}]} as unknown as DocumentNode<FriendsQuery, FriendsQueryVariables>;
export const FriendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"friend"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPreviewFields"}}]}}]}},...UserPreviewFieldsFragmentDoc.definitions]} as unknown as DocumentNode<FriendQuery, FriendQueryVariables>;
export const RecentFeedsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recentFeeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recentFeeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeedPreviewFields"}}]}}]}},...FeedPreviewFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RecentFeedsQuery, RecentFeedsQueryVariables>;
export const RecentArticlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"recentArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recentArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArticlePreviewFields"}},{"kind":"Field","name":{"kind":"Name","value":"feed"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedId"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}},...ArticlePreviewFieldsFragmentDoc.definitions]} as unknown as DocumentNode<RecentArticlesQuery, RecentArticlesQueryVariables>;
export const UpdateFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"feedId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"feedId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeedPreviewFields"}}]}}]}},...FeedPreviewFieldsFragmentDoc.definitions]} as unknown as DocumentNode<UpdateFeedMutation, UpdateFeedMutationVariables>;
export const MyFeedsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myFeeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myFeeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeedPreviewFields"}}]}}]}},...FeedPreviewFieldsFragmentDoc.definitions]} as unknown as DocumentNode<MyFeedsQuery, MyFeedsQueryVariables>;
export const FollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"follow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"following"}}]}}]}}]} as unknown as DocumentNode<FollowMutation, FollowMutationVariables>;
export const UnfollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unfollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"following"}}]}}]}}]} as unknown as DocumentNode<UnfollowMutation, UnfollowMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"discriminator"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"following"}},{"kind":"Field","name":{"kind":"Name","value":"feeds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeedPreviewFields"}}]}}]}}]}},...FeedPreviewFieldsFragmentDoc.definitions]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const SelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"self"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPreviewFields"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}}]}}]}},...UserPreviewFieldsFragmentDoc.definitions]} as unknown as DocumentNode<SelfQuery, SelfQueryVariables>;