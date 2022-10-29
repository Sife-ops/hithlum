import { ArticleType } from "../article";
import { FeedType } from "../feed";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";

const { FeedEntity, ArticleEntity } = hithlumModel.entities;

const daysToMillis = (n: number) => 1000 * 60 * 60 * 24 * n;

builder.queryFields((t) => ({
  hello: t.string({
    resolve: () => "hello",
  }),

  recentFeeds: t.field({
    type: [FeedType],
    resolve: async () => {
      const since = Date.now() - daysToMillis(365);

      const { data } = await FeedEntity.query
        .recent_({})
        .gt({ createdAt: since })
        .go({ limit: 10 });

      return data;
    },
  }),

  recentArticles: t.field({
    type: [ArticleType],
    resolve: async () => {
      const since = Date.now() - daysToMillis(365);

      const { data } = await ArticleEntity.query
        .recent_({})
        .gt({ isoDate_millis: since })
        .go({ limit: 10 });

      return data;
    },
  }),
}));
