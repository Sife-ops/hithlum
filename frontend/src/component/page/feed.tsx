import {
  Feed as FeedType,
  useFeedQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "@hithlum/graphql/urql";
import { graphql } from "@hithlum/graphql/gql";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const Feed = () => {
  const { feedId } = useParams();

  // todo: redirect if feedId undefined
  const [feedQueryState] = useFeedQuery({ variables: { feedId: feedId! } });
  const [feed, setFeed] = useState<FeedType>();

  const [_, subscribeMutation] = useSubscribeMutation();
  const [__, unsubscribeMutation] = useUnsubscribeMutation();

  useEffect(() => {
    const { fetching, data } = feedQueryState;
    if (!fetching && data) {
      setFeed(data.feed as FeedType);
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
          <button
            onClick={() => {
              const { feedId } = feed;
              if (feed.subscribed) unsubscribeMutation({ feedId });
              else subscribeMutation({ feedId });
            }}
          >
            {feed.subscribed ? "unsubscribe" : "subscribe"}
          </button>

          <h3>Articles</h3>
          <div>
            {feed.articles.map((article) => (
              <div key={article.articleId}>
                <div>{article.title}</div>
                <div>{article.unread.value ? "unread" : "read"}</div>
                <div>{article.link}</div>
                <div>{article.summary}</div>
                <div>{article.isoDate}</div>
                <div>
                  <Link to={"/article/" + article.articleId}>read</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const subscribe = graphql(`
  mutation subscribe($feedId: String!) {
    subscribe(feedId: $feedId) {
      subscribed
    }
  }
`);

const unsubscribe = graphql(`
  mutation unsubscribe($feedId: String!) {
    unsubscribe(feedId: $feedId) {
      subscribed
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

      subscribed

      articles {
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
      }
    }
  }
`);
