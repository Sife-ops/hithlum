import { ArticleEntityType } from "@hithlum/core/entity/article";
import { UnreadEntity } from "@hithlum/core/entity/unread";
import { builder } from "../builder";

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
