import { graphql } from "@hithlum/graphql/gql";

const hello = graphql(`
  query hello {
    hello
  }
`);
