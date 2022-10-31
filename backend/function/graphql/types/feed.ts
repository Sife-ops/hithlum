import _ from "lodash";
import { ArticleType } from "./article";
import { FeedEntityType } from "@hithlum/core/entity/feed";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";

const { ArticleEntity, UserFeedEntity } = hithlumModel.entities;

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

    subscribed: t.boolean({
      resolve: ({ feedId }, __, { user: { userId } }) =>
        UserFeedEntity.query
          .feed_({ feedId, userId })
          .go()
          .then((e) => {
            if (e.data.length > 0) return true;
            else return false;
          }),
    }),

    latestArticle: t.field({
      type: ArticleType,
      resolve: ({ feedId }) =>
        ArticleEntity.query
          .feed_({ feedId })
          .go({ order: "desc", limit: 1 })
          .then((e) => e.data[0]),
    }),

    // can't use loader
    articles: t.field({
      type: [ArticleType],
      resolve: ({ feedId }) =>
        ArticleEntity.query
          .feed_({ feedId })
          .go({ order: "desc" })
          .then((e) => e.data),
    }),
  }),
});
