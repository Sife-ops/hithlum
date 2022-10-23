/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query hello {\n    hello\n  }\n": types.HelloDocument,
    "\n  query world {\n    world\n  }\n": types.WorldDocument,
};

export function graphql(source: "\n  query hello {\n    hello\n  }\n"): (typeof documents)["\n  query hello {\n    hello\n  }\n"];
export function graphql(source: "\n  query world {\n    world\n  }\n"): (typeof documents)["\n  query world {\n    world\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;