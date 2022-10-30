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
}));
