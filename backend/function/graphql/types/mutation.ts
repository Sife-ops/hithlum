import rss from "rss-parser";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";
import { FeedType } from "./feed";

const parser = new rss();

const { FeedEntity, UserFeedEntity, ArticleEntity } = hithlumModel.entities;

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
        const { feedUrl, title, items } = parsed;

        // create feed
        const { data } = await FeedEntity.create({
          feedUrl,
          title,
          inputUrl: url,
        }).go();

        feed = data;

        // create articles
        // todo: move to SQS
        for (const item of items) {
          await ArticleEntity.create({
            feedId: feed.feedId,
            title: item.title,
          }).go();
        }
      }

      await UserFeedEntity.create({
        userId,
        feedId: feed.feedId,
      }).go();

      return feed;
    },
  }),
}));
