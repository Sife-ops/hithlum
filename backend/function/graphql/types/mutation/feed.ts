// todo: duplicated in queries
import { FeedType } from "../feed";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";

const { FeedEntity } = hithlumModel.entities;

builder.mutationFields((t) => ({
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
