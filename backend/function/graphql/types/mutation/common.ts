import _ from "lodash";
import AWS from "aws-sdk";
import { ulid } from "ulid";
import { Item } from "rss-parser";

const sqs = new AWS.SQS();
const { ARTICLE_QUEUE } = process.env;

export const sendArticlesBatch = async (articles: Item[], feedId: string) => {
  await sendArticlesBatch_(
    articles,
    feedId,
    async (MessageBody) => {
      await sqs
        .sendMessage({
          QueueUrl: ARTICLE_QUEUE!,
          MessageBody,
        })
        .promise();
    },
    async (messages) => {
      await sqs
        .sendMessageBatch({
          QueueUrl: ARTICLE_QUEUE!,
          Entries: messages.map((e: string) => ({
            Id: ulid(),
            MessageBody: e,
          })),
        })
        .promise();
    }
  );
};

export const sendArticlesBatch_ = async (
  articles: Item[],
  feedId: string,
  singleFn: (MessageBody: string) => Promise<void>,
  batchFn: (messages: string[]) => Promise<void>
) => {
  for (const articleChunk of _.chunk(articles, 10)) {
    let messages: string[] = [];
    let bytes = 0;
    for (const article of articleChunk) {
      const message = JSON.stringify({ ...article, feedId });
      messages = [...messages, message];
      bytes = bytes + Buffer.byteLength(message, "utf-8");
    }

    if (bytes > 262143) {
      for (let MessageBody of messages) {
        bytes = Buffer.byteLength(MessageBody, "utf-8");

        if (bytes > 262143) {
          console.log("stripping content snippet");
          const parsed = JSON.parse(MessageBody);
          MessageBody = JSON.stringify(_.omit(parsed, "contentSnippet"));
          bytes = Buffer.byteLength(MessageBody, "utf-8");
        }

        if (bytes > 262143) {
          console.log("stripping content");
          const parsed = JSON.parse(MessageBody);
          MessageBody = JSON.stringify(_.omit(parsed, "content"));
          bytes = Buffer.byteLength(MessageBody, "utf-8");
        }

        if (bytes > 262143) {
          console.error(
            `discarding message for feed ${feedId} exceeding byte limit:`,
            MessageBody.slice(0, 100)
          );
          continue;
        }

        await singleFn(MessageBody);
      }
    } else {
      await batchFn(messages);
    }
  }
};
