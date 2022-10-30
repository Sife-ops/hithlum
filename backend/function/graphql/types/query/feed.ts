import { FeedEntityType } from "@hithlum/core/entity/feed";
import { FeedType } from "../feed";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";

const { FeedEntity, UserFeedEntity } = hithlumModel.entities;

builder.queryFields((t) => ({
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

  myFeeds: t.field({
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
