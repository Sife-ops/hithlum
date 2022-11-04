import _ from "lodash";
import AWS from "aws-sdk";
import { ulid } from "ulid";

const sqs = new AWS.SQS();
const { ARTICLE_QUEUE } = process.env;

// todo: uses too much 'any'
export const sendArticlesBatch = async (articles: any[], feedId: string) => {
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
          Entries: messages.map((e: any) => ({
            Id: ulid(),
            MessageBody: e,
          })),
        })
        .promise();
    }
  );
};

// todo: this function sucks and needs to be refactored
export const sendArticlesBatch_ = async (
  articles: any[],
  feedId: string,
  singleFn: (MessageBody: string) => Promise<void>,
  batchFn: (messages: string[]) => Promise<void>
) => {
  for (const articleChunk of _.chunk(articles, 10)) {
    let messages: any = [];
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
