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

    categories: t.exposeString("categories", { nullable: true }),
    content: t.exposeString("content", { nullable: true }),
    contentSnippet: t.exposeString("contentSnippet", { nullable: true }),
    creator: t.exposeString("creator", { nullable: true }),
    enclosure: t.exposeString("enclosure", { nullable: true }),
    guid: t.exposeString("guid", { nullable: true }),
    isoDate: t.exposeString("isoDate", { nullable: true }),
    link: t.exposeString("link", { nullable: true }),
    pubDate: t.exposeString("pubDate", { nullable: true }),
    summary: t.exposeString("summary", { nullable: true }),
    title: t.exposeString("title", { nullable: true }),

    unread: t.loadable({
      type: UnreadType,
      resolve: (p) => p.articleId,
      load: async (articleIds: string[], { user: { userId } }) => {
        // todo: only pull 3 months of records?
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
