import lodash from "lodash";
import rss from "rss-parser";
import { FeedType } from "../feed";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";
import { sendArticlesBatch } from "./common";
import { ulid } from "ulid";

const parser = new rss();
const { FeedEntity, UserFeedEntity } = hithlumModel.entities;
const { ARTICLE_QUEUE } = process.env;

builder.mutationFields((t) => ({
  addFeed: t.field({
    type: FeedType,
    args: {
      url: t.arg.string({ required: true }),
    },
    resolve: async (_, { url }, { user: { userId } }) => {
      const parsed = await parser.parseURL(url);

      const {
        data: [foundFeed],
      } = await FeedEntity.query.feedUrl_({ feedUrl: url }).go();

      let feed: any;
      if (foundFeed) {
        // feed exists
        feed = foundFeed;

        const {
          data: [foundUserFeed],
        } = await UserFeedEntity.query
          .user_({ userId })
          .where(({ feedId }, { eq }) => eq(feedId, feed.feedId))
          .go();

        if (foundUserFeed) throw new Error("already subscribed");
      } else {
        // create feed
        const { data } = await FeedEntity.create({
          ...parsed,
          inputUrl: url,
          feedUrl: parsed.feedUrl || url,
          imageUrl: parsed.image?.url,
        }).go();

        feed = data;

        await sendArticlesBatch(parsed.items, data.feedId);
      }

      await UserFeedEntity.create({ userId, feedId: feed.feedId }).go();

      return feed;
    },
  }),
}));
