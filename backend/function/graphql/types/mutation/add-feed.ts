import AWS from "aws-sdk";
import lodash from "lodash";
import rss from "rss-parser";
import { FeedType } from "../feed";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";
import { ulid } from "ulid";

const sqs = new AWS.SQS();
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
        const { data } = await FeedEntity.create({
          inputUrl: url,
          ...parsed,
          imageUrl: parsed.image?.url,
        }).go();

        feed = data;

        // create articles
        for (const articleChunk of lodash.chunk(parsed.items, 10)) {
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