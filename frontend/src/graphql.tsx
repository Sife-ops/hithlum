import { graphql } from "@hithlum/graphql/gql";

const hello = graphql(`
  query hello {
    hello
  }
`);

const recentFeeds = graphql(`
  query recentFeeds {
    recentFeeds {
      feedId
      inputUrl

      feedUrl
      imageUrl
      title
      description
      link
    }
  }
`);

const recentArticles = graphql(`
  query recentArticles {
    recentArticles {
      articleId
      feedId
      unread {
        value
      }
    }
  }
`);

const addFeed = graphql(`
  mutation addFeed($url: String!) {
    addFeed(url: $url) {
      feedId
    }
  }
`);

