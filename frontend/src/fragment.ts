import { graphql } from "@hithlum/graphql/gql";

const articlePreviewFields = graphql(`
  fragment ArticlePreviewFields on Article {
    articleId
    feedId

    title
    summary
    isoDate

    unread {
      value
    }
  }
`);

const feedPreviewFields = graphql(`
  fragment FeedPreviewFields on Feed {
    feedId

    image
    title
    createdAt_isoDate

    latestArticle {
      ...ArticlePreviewFields
    }
  }
`);

