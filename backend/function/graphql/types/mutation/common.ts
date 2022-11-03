import _ from "lodash";
import AWS from "aws-sdk";
import { ulid } from "ulid";

const sqs = new AWS.SQS();
const { ARTICLE_QUEUE } = process.env;

// todo: if batched is too large, switch to one-message strategy
// todo: increase lambda timeout?
// todo: remove content until small enough

export const sendArticlesBatch = (articles: any[], feedId: string) => {
  sendArticlesBatch_(
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

export const sendArticlesBatch_ = async (
  articles: any[],
  feedId: string,
  fn1: (MessageBody: any) => Promise<void>,
  fn2: (messages: any[]) => Promise<void>
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
      for (const MessageBody of messages) {
        bytes = Buffer.byteLength(MessageBody, "utf-8");
        if (bytes > 262143) {
          // todo: log this message somewhere
          continue;
        } else {
          await fn1(MessageBody);
        }
      }
    } else {
      await fn2(messages);
    }
  }
};
