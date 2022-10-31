import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";

const { UserFeedEntity } = hithlumModel.entities;

builder.mutationFields((t) => ({
  subscribe: t.boolean({
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

      return true;
    },
  }),

  unsubscribe: t.boolean({
    args: {
      feedId: t.arg.string({ required: true }),
    },
    resolve: async (_, { feedId }, { user: { userId } }) => {
      const {
        data: [userFeed],
      } = await UserFeedEntity.query.feed_({ feedId, userId }).go();

      if (!userFeed) throw new Error("not subscribed");

      await UserFeedEntity.remove(userFeed).go();

      return true;
    },
  }),
}));
