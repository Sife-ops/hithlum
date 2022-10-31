import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";
import { FeedType } from "../feed";

const { UserFeedEntity, FeedEntity } = hithlumModel.entities;

builder.mutationFields((t) => ({
  subscribe: t.field({
    type: FeedType,
    args: {
      feedId: t.arg.string({ required: true }),
      //   value: t.arg.boolean({ required: true }),
    },
    resolve: async (_, { feedId }, { user: { userId } }) => {
      const {
        data: [userFeed],
      } = await UserFeedEntity.query.feed_({ feedId, userId }).go();

      if (userFeed) throw new Error("already subscribed");

      await UserFeedEntity.create({ feedId, userId }).go();

      const {
        data: [feed],
      } = await FeedEntity.query.feed({ feedId }).go();

      return feed;
    },
  }),

  unsubscribe: t.field({
    type: FeedType,
    args: {
      feedId: t.arg.string({ required: true }),
    },
    resolve: async (_, { feedId }, { user: { userId } }) => {
      const {
        data: [userFeed],
      } = await UserFeedEntity.query.feed_({ feedId, userId }).go();

      if (!userFeed) throw new Error("not subscribed");

      await UserFeedEntity.remove(userFeed).go();

      const {
        data: [feed],
      } = await FeedEntity.query.feed({ feedId }).go();

      return feed;
    },
  }),
}));
