import rss from "rss-parser";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";
import { FeedType } from "./feed";

const parser = new rss();

const { FeedEntity, UserFeedEntity } = hithlumModel.entities;

builder.mutationFields((t) => ({
  updateFeed: t.string({
    resolve: async (_, { feedUrl }, { user: { userId } }) => {
      return "lol";
    },
  }),

  addFeed: t.field({
    type: FeedType,
    args: {
      url: t.arg.string({ required: true }),
    },
    resolve: async (_, { url }, { user: { userId } }) => {
      const parsed = await parser.parseURL(url);

      // todo: don't use scan
      const {
        data: [foundFeed],
      } = await FeedEntity.scan
        .where(({ feedUrl }, { eq }) => eq(feedUrl, parsed.feedUrl))
        .go();

      let feed: any;
      if (foundFeed) {
        // feed exists
        feed = foundFeed;

        const {
          data: [foundUserFeed],
        } = await UserFeedEntity.query
          .user_({
            userId,
          })
          .where(({ feedId }, { eq }) => eq(feedId, feed.feedId))
          .go();

        if (foundUserFeed) throw new Error("already subscribed");
      } else {
        // create feed
        const { feedUrl, title } = parsed;
        const { data } = await FeedEntity.create({
          feedUrl,
          title,
          inputUrl: url,
        }).go();
        feed = data;
      }

      await UserFeedEntity.create({
        userId,
        feedId: feed.feedId,
      }).go();

      return feed;
    },
  }),
}));
