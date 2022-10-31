import { useFeed } from "./feed-hook";
import { useParams, Link } from "react-router-dom";

export const Feed = () => {
  const { feedId } = useParams();
  // todo: redirect if feedId undefined
  const ctx = useFeed(feedId!);

  return (
    <div>
      {ctx.feed && (
        <div>
          <h3>{ctx.feed.title}</h3>
          <div>{ctx.feed.imageUrl}</div>
          <div>{ctx.feed.description}</div>
          <div>{ctx.feed.link}</div>
          <div>{ctx.feed.feedUrl}</div>
          <button
            onClick={() => {
              if (!ctx.feed) return;
              const { feedId } = ctx.feed;
              if (ctx.feed.subscribed) ctx.unsubscribeMutation({ feedId });
              else ctx.subscribeMutation({ feedId });
            }}
          >
            {ctx.feed.subscribed ? "unsubscribe" : "subscribe"}
          </button>

          <h3>Articles</h3>
          <div>
            {ctx.feed.articles.map((article) => (
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
