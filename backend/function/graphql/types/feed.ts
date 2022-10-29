import { ArticleType } from "./article";
import { FeedEntityType } from "@hithlum/core/entity/feed";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";

const { ArticleEntity } = hithlumModel.entities;

export const FeedType = builder.objectRef<FeedEntityType>("Feed");
FeedType.implement({
  fields: (t) => ({
    feedId: t.exposeID("feedId"),
    inputUrl: t.exposeString("inputUrl"),
    private: t.exposeBoolean("private"),
    createdAt_isoDate: t.exposeString("createdAt_isoDate"),

    feedUrl: t.exposeString("feedUrl", { nullable: true }),
    imageUrl: t.exposeString("imageUrl", { nullable: true }),
    title: t.exposeString("title", { nullable: true }),
    description: t.exposeString("description", { nullable: true }),
    link: t.exposeString("link", { nullable: true }),

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
