import { FeedEntityType } from "@hithlum/core/entity/feed";
import { FeedType, ArticleType } from "./feed";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";

const { FeedEntity, UserFeedEntity, ArticleEntity } = hithlumModel.entities;

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
        .go({ limit: 20 });

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
        .go({ limit: 20 });

      return data;
    },
  }),

  feed: t.field({
    type: FeedType,
    args: {
      feedId: t.arg.string({ required: true }),
    },
    resolve: (_, { feedId }) =>
      FeedEntity.query
        .feed({ feedId })
        .go()
        .then((res) => res.data[0]),
  }),

  feeds: t.field({
    type: [FeedType],
    resolve: async (_, __, { user: { userId } }) => {
      const { data: userFeeds } = await UserFeedEntity.query
        .user_({ userId })
        .go();

      let feeds: FeedEntityType[] = [];
      for (const { feedId } of userFeeds) {
        const {
          data: [feed],
        } = await FeedEntity.query.feed({ feedId }).go();
        feeds = [...feeds, feed];
      }

      return feeds;
    },
  }),
}));
