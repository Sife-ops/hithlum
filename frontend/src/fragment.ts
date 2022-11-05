import { graphql } from "@hithlum/graphql/gql";

graphql(`
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

graphql(`
  fragment FeedPreviewFields on Feed {
    feedId

    image
    title
    createdAt

    latestArticle {
      ...ArticlePreviewFields
    }
  }
`);

graphql(`
  fragment UserPreviewFields on User {
    userId
    username
    discriminator
    avatarUrl
  }
`);
