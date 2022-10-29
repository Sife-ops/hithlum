import { useParams } from "react-router-dom";
import { Feed as FeedType, useFeedQuery } from "@hithlum/graphql/urql";
import { useEffect, useState } from "react";

export const Feed = () => {
  const { feedId } = useParams();

  // todo: redirect if feedId undefined
  const [feedQueryState] = useFeedQuery({ variables: { feedId: feedId! } });
  const [feed, setFeed] = useState<FeedType>();

  useEffect(() => {
    const { fetching, data, error } = feedQueryState;
    if (!fetching && data) {
      setFeed(data.feed);
    }
  }, [feedQueryState.data]);

  return (
    <div>
      {feed && (
        <div>
          <h3>{feed.title}</h3>
          <div>{feed.imageUrl}</div>
          <div>{feed.description}</div>
          <div>{feed.link}</div>
          <div>{feed.feedUrl}</div>

          <h3>Articles</h3>
          <div>
            {feed.articles.map((article) => (
              <div key={article.articleId}>
                <div>{article.title}</div>
                <div>{article.link}</div>
                <div>{article.summary}</div>
                <div>{article.isoDate}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
