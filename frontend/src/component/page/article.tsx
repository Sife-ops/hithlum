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
          <div>
            {formatDistance(new Date(article.isoDate!), new Date(), {
              addSuffix: true,
            })}
          </div>
          <br />
          {article.link && (
            <div>
              Link:{" "}
              <a href={article.link} target="_blank">
                {article.link}
              </a>
            </div>
          )}
          {article.enclosureUrl && (
            <div>
              enclosure:{" "}
              <ul>
                <li>
                  <a href={article.enclosureUrl} target="_blank">
                    {article.enclosureUrl}
                  </a>
                </li>
                {article.enclosureType && <li>{article.enclosureType}</li>}
              </ul>
            </div>
          )}
          {article.summary && (
            <div>
              <h4>Summary:</h4>
              <p>{article.summary}</p>
            </div>
          )}
          {article.content && (
            <div>
              <h4>Content:</h4>
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          )}
          {/* {article.contentSnippet && (
            <div>contentSnippet: {article.contentSnippet}</div>
          )} */}
        </div>
      </div>
    );
  }

  return <div>loading...</div>;
};

graphql(`
  mutation setUnread($articleId: String!, $value: Boolean!) {
    setUnread(articleId: $articleId, value: $value) {
      value
    }
  }
`);

graphql(`
  query article($articleId: String!) {
    article(articleId: $articleId) {
      articleId
      feedId

      content
      contentSnippet
      creator
      guid
      isoDate
      link
      pubDate
      summary
      title
      enclosureUrl
      enclosureType

      unread {
        value
      }

      feed {
        ...FeedPreviewFields
      }
    }
  }
`);
