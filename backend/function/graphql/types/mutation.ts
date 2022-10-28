import AWS from "aws-sdk";
import lodash from "lodash";
import rss from "rss-parser";
import { FeedType } from "./feed";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";
import { ulid } from "ulid";

const sqs = new AWS.SQS();

const parser = new rss();

const { FeedEntity, UserFeedEntity } = hithlumModel.entities;

const { ARTICLE_QUEUE, MANDOS_URL } = process.env;

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
      console.log('mandos url',MANDOS_URL)
      console.log('mandos url',MANDOS_URL)
      console.log('mandos url',MANDOS_URL)
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
        const articleChunks = lodash.chunk(items, 10);
        for (const articleChunk of articleChunks) {
          await sqs
            .sendMessageBatch({
              QueueUrl: ARTICLE_QUEUE!,
              Entries: articleChunk.map((e) => ({
                Id: ulid(),
                MessageBody: JSON.stringify({
                  ...e,
                  feedId: feed.feedId,
                }),
              })),
            })
            .promise();
        }
      }

      await UserFeedEntity.create({ userId, feedId: feed.feedId }).go();

      return feed;
    },
  }),
}));
