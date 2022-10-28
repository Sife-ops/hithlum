import { FeedEntityType } from "@hithlum/core/entity/feed";
import { FeedType } from "./feed";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";

const { FeedEntity, UserFeedEntity } = hithlumModel.entities;

builder.queryFields((t) => ({
  hello: t.string({
    resolve: () => "hello",
  }),

  recentlyAddedFeeds: t.field({
    type: [FeedType],
    resolve: async () => {
      const days = (n: number) => 1000 * 60 * 60 * 24 * n;
      const since = Date.now() - days(7);

      const { data } = await FeedEntity.query
        .recent_({})
        .gt({ createdAt: since })
        .go({ limit: 50 });

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
