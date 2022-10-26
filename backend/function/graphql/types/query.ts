import { FeedEntityType } from "@hithlum/core/entity/feed";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";

export const FeedType = builder.objectRef<FeedEntityType>("Feed");
FeedType.implement({
  fields: (t) => ({
    feedId: t.exposeID("feedId"),
    data: t.exposeString("data"),
  }),
});

builder.queryFields((t) => ({
  hello: t.string({
    resolve: () => "hello",
  }),

  feeds: t.field({
    type: [FeedType],
    resolve: async (_, __, { user: { userId } }: any) => {
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
