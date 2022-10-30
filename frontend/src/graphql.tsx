import { graphql } from "@hithlum/graphql/gql";

const hello = graphql(`
  query hello {
    hello
  }
`);

const addFeed = graphql(`
  mutation addFeed($url: String!) {
    addFeed(url: $url) {
      feedId
    }
  }
`);
