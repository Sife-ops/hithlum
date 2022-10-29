import { graphql } from "@hithlum/graphql/gql";

const setUnread = graphql(`
  mutation setUnread($articleId: String!, $value: Boolean!) {
    setUnread(articleId: $articleId, value: $value) {
      value
    }
  }
`)

const article = graphql(`
  query article($articleId: String!) {
    article(articleId: $articleId) {
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
`);

const feed = graphql(`
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
`);

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
      private
      createdAt_isoDate

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
