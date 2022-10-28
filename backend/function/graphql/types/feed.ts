import { ArticleEntityType } from "@hithlum/core/entity/article";
import { FeedEntityType } from "@hithlum/core/entity/feed";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";

const { ArticleEntity, UnreadEntity } = hithlumModel.entities;

// todo: missing fields
export const UnreadType = builder.objectRef<{ value: boolean }>("Unread");
UnreadType.implement({
  fields: (t) => ({
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
        const { data: unreads } = await UnreadEntity.query
          .user_({ userId })
          .go();

        return articleIds.map((articleId) => {
          const found = unreads.find((u) => u.articleId === articleId);
          if (found) return found;
          else return { value: true };
        });
      },
    }),
  }),
});

export const FeedType = builder.objectRef<FeedEntityType>("Feed");
FeedType.implement({
  fields: (t) => ({
    feedId: t.exposeID("feedId"),

    inputUrl: t.exposeString("inputUrl"),
    feedUrl: t.exposeString("title", { nullable: true }),
    title: t.exposeString("title", { nullable: true }),

    // can't use loader
    articles: t.field({
      type: [ArticleType],
      resolve: async ({ feedId }) => {
        const { data } = await ArticleEntity.query.feed_({ feedId }).go();
        return data;
      },
    }),
  }),
});
