import { Article, Feed } from "@hithlum/graphql/urql";
import { FeedPreview, FeedPreviewSkeleton } from "../feed-preview";

export const Dev = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "1rem",
      }}
    >
      <FeedPreview
        feed={
          {
            feedId: "",
            image: "",
            title: "feed title",
          } as Feed
        }
        article={
          {
            articleId: "",
            title: "article title",
            isoDate: "2022-11-09T06:27:48.000Z",
            unread: {
              value: true,
            },
          } as Article
        }
      />
      <FeedPreviewSkeleton />
    </div>
  );
};
