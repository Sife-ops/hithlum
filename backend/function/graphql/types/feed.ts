import { ArticleEntityType } from "@hithlum/core/entity/article";
import { FeedEntityType } from "@hithlum/core/entity/feed";
import { UnreadEntityType } from "@hithlum/core/entity/unread";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";

export const UnreadType = builder.objectRef<UnreadEntityType>("Unread");
UnreadType.implement({
  fields: (t) => ({
    unreadId: t.exposeID("unreadId"),
    userId: t.exposeString("userId"),
    feedId: t.exposeString("feedId"),
    articleId: t.exposeString("articleId"),
    value: t.exposeBoolean("value"),
  }),
});

export const ArticleType = builder.objectRef<ArticleEntityType>("Article");
ArticleType.implement({
  fields: (t) => ({
    articleId: t.exposeID("articleId"),
    feedId: t.exposeString("feedId"),

    unread: t.loadable({
      type: UnreadType,
      resolve: (p) => p.articleId,
      load: async (articleIds: string[], { user: { userId } }) => {
        const { data: unreads } = await hithlumModel.entities.UnreadEntity.query
          .user_({
            userId,
          })
          .go();

        return articleIds.map((articleId) => {
          const found = unreads.find(
            (unread) => unread.articleId === articleId
          );
          if (found) {
            return found;
          } else {
            return {
              userId,
              unreadId: "",
              feedId: "",
              articleId,
              value: true,
            };
          }
        });
      },
    }),
  }),
});

export const FeedType =
  builder.objectRef<// FeedEntityType & { unread: UnreadEntityType }
  FeedEntityType>("Feed");
FeedType.implement({
  fields: (t) => ({
    feedId: t.exposeID("feedId"),

    inputUrl: t.exposeString("inputUrl"),
    feedUrl: t.exposeString("title", { nullable: true }),
    title: t.exposeString("title", { nullable: true }),

    articles: t.field({
      type: [ArticleType],
      resolve: async ({ feedId }) => {
        const { data } = await hithlumModel.entities.ArticleEntity.query
          .feed_({
            feedId,
          })
          .go();
        return data;
      },
    }),

    // todo: latest article
    unread: t.loadable({
      type: UnreadType,
      resolve: (p) => p.feedId,
      load: async (feedIds: string[], { user: { userId } }) => {
        const { data } = await hithlumModel.entities.UnreadEntity.query
          .user_({
            userId,
          })
          .go();

        return feedIds.map((feedId) => {
          const found = data.find((unread) => unread.feedId === feedId);
          if (found) {
            return found;
          } else {
            return {
              userId,
              unreadId: "",
              feedId,
              articleId: "",
              value: true,
            };
          }
        });
      },
    }),
  }),
});
