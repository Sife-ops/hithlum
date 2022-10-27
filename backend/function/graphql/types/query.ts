import { FeedEntityType } from "@hithlum/core/entity/feed";
import { FeedType } from "./feed";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";

builder.queryFields((t) => ({
  hello: t.string({
    resolve: () => "hello",
  }),

  feeds: t.field({
    type: [FeedType],
    resolve: async (_, __, { user: { userId } }) => {
      const { data: userFeeds } =
        await hithlumModel.entities.UserFeedEntity.query.user_({ userId }).go();

      let feeds: FeedEntityType[] = [];
      for (const userFeed of userFeeds) {
        const {
          data: [feed],
        } = await hithlumModel.entities.FeedEntity.query
          .feed({
            feedId: userFeed.feedId,
          })
          .go();
        feeds = [...feeds, feed];
      }

      return feeds;
    },
  }),
}));
