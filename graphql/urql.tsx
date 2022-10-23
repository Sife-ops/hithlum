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

export type RootQueryType = {
  __typename?: 'RootQueryType';
  hello?: Maybe<Scalars['String']>;
  world?: Maybe<Scalars['String']>;
};

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'RootQueryType', hello?: string | null };

export type WorldQueryVariables = Exact<{ [key: string]: never; }>;


export type WorldQuery = { __typename?: 'RootQueryType', world?: string | null };


export const HelloDocument = gql`
    query hello {
  hello
}
    `;

export function useHelloQuery(options?: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'>) {
  return Urql.useQuery<HelloQuery, HelloQueryVariables>({ query: HelloDocument, ...options });
};
export const WorldDocument = gql`
    query world {
  world
}
    `;

export function useWorldQuery(options?: Omit<Urql.UseQueryArgs<WorldQueryVariables>, 'query'>) {
  return Urql.useQuery<WorldQuery, WorldQueryVariables>({ query: WorldDocument, ...options });
};