import { FeedEntityType } from "@hithlum/core/entity/feed";
import { ArticleEntityType } from "@hithlum/core/entity/article";
import { builder } from "../builder";

export const ArticleType = builder.objectRef<ArticleEntityType>("Article");
ArticleType.implement({
  fields: (t) => ({
    articleId: t.exposeID("articleId"),
    feedId: t.exposeString("feedId"),
  }),
});

export const FeedType = builder.objectRef<FeedEntityType>("Feed");
FeedType.implement({
  fields: (t) => ({
    feedId: t.exposeID("feedId"),

    inputUrl: t.exposeString("inputUrl"),
    feedUrl: t.exposeString("title", { nullable: true }),
    title: t.exposeString("title", { nullable: true }),
  }),
});
