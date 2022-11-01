import defaultArtwork from "../../assets/default/artwork.svg";
import { formatDistance } from "date-fns";
import { graphql } from "@hithlum/graphql/gql";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Article as ArticleType,
  useArticleQuery,
  useSetUnreadMutation,
} from "@hithlum/graphql/urql";

export const Article = () => {
  const { articleId } = useParams();

  // todo: redirect if articleId undefined
  const [articleQueryState] = useArticleQuery({
    variables: { articleId: articleId! },
  });
  const [article, setArticle] = useState<ArticleType>();

  useEffect(() => {
    const { fetching, data } = articleQueryState;
    if (!fetching && data) {
      setArticle(data.article as ArticleType);
    }
  }, [articleQueryState.data]);

  const [_, setUnread] = useSetUnreadMutation();

  useEffect(() => {
    // todo: redirect if articleId undefined
    setUnread({ articleId: articleId!, value: false });
  }, []);

  if (article) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <img
          src={article.feed.image || defaultArtwork}
          alt="missing imageUrl"
          style={{
            width: "128px",
            height: "auto",
          }}
        />
        <div>
          <h3>{article.title}</h3>
          {article.summary && (
            <div>
              summary:{" "}
              <a href={article.summary} target="_blank">
                {article.summary}
              </a>
            </div>
          )}
          {article.content && (
            <div>
              content:{" "}
              <a href={article.content} target="_blank">
                {article.content}
              </a>
            </div>
          )}
          {article.contentSnippet && (
            <div>
              contentSnippet:{" "}
              <a href={article.contentSnippet} target="_blank">
                {article.contentSnippet}
              </a>
            </div>
          )}
          {article.link && (
            <div>
              link:{" "}
              <a href={article.link} target="_blank">
                {article.link}
              </a>
            </div>
          )}
          <div>
            {formatDistance(new Date(article.isoDate!), new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>
    );
  }

  return <div>loading...</div>;
};

const setUnread = graphql(`
  mutation setUnread($articleId: String!, $value: Boolean!) {
    setUnread(articleId: $articleId, value: $value) {
      value
    }
  }
`);

const article = graphql(`
  query article($articleId: String!) {
    article(articleId: $articleId) {
      articleId
      feedId

      categories
      content
      contentSnippet
      creator
      guid
      isoDate
      link
      pubDate
      summary
      title

      unread {
        value
      }

      feed {
        ...FeedPreviewFields
      }
    }
  }
`);
