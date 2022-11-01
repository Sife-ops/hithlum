import { ArticleType } from "../article";
import { FeedType } from "../feed";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";

const { FeedEntity, ArticleEntity } = hithlumModel.entities;

builder.queryFields((t) => ({
  hello: t.string({ // todo: remove hello query
    resolve: () => "hello",
  }),

  recentFeeds: t.field({
    type: [FeedType],
    resolve: () =>
      FeedEntity.query
        .recent_({})
        .go({ limit: 10, order: "desc" })
        .then((e) => e.data),
  }),

  recentArticles: t.field({
    type: [ArticleType],
    resolve: () =>
      ArticleEntity.query
        .recent_({})
        .go({ limit: 10, order: "desc" })
        .then((e) => e.data),
  }),
}));
