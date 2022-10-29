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
`);

const addFeed = graphql(`
  mutation addFeed($url: String!) {
    addFeed(url: $url) {
      feedId
    }
  }
`);
