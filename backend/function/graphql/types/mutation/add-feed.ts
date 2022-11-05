import rss from "rss-parser";
import { FeedType } from "../feed";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";
import { sendArticlesBatch } from "./common";

const parser = new rss();
const { FeedEntity, UserFeedEntity } = hithlumModel.entities;

builder.mutationFields((t) => ({
  addFeed: t.field({
    type: FeedType,
    args: {
      url: t.arg.string({ required: true }),
    },
    resolve: async (_, { url }, { user: { userId } }) => {
      const parsed = await parser.parseURL(url).catch((e) => {
        throw new Error(`RSS parser: ${e}`);
      });

      const {
        data: [foundFeed],
      } = await FeedEntity.query
        .feedUrl_({ feedUrl: parsed.feedUrl || url })
        .go();

      let feed: any;
      if (foundFeed) {
        // feed exists
        const {
          data: [foundUserFeed],
        } = await UserFeedEntity.query
          .user_({ userId })
          .where(({ feedId }, { eq }) => eq(feedId, foundFeed.feedId))
          .go();

        if (foundUserFeed) throw new Error("already subscribed");
        await UserFeedEntity.create({ userId, feedId: foundFeed.feedId }).go();

        feed = foundFeed;
      } else {
        // create feed
        const { data } = await FeedEntity.create({
          ...parsed,
          inputUrl: url,
          feedUrl: parsed.feedUrl || url,
          imageUrl: parsed.image?.url,
          itunesImage: parsed.itunes?.image,
          addedByUser: userId,
        }).go();

        await UserFeedEntity.create({ userId, feedId: data.feedId }).go();
        await sendArticlesBatch(
          parsed.items.map((item) => ({
            ...item,
            enclosureUrl: item.enclosure?.url,
            // enclosureLength: item.enclosure?.length, // todo: might break?
            enclosureType: item.enclosure?.type,
            // categories: item.categories
            //   ? JSON.stringify(item.categories)
            //   : "[]",
          })),
          data.feedId
        );

        feed = data;
      }

      return feed;
    },
  }),
}));
