import _ from "lodash";
import AWS from "aws-sdk";
// import { ulid } from "ulid";

const sqs = new AWS.SQS();

const { ARTICLE_QUEUE } = process.env;

// todo: remove content until small enough
const isBodyTooLong = (s: string): boolean => {
  let bytes = Buffer.byteLength(s, "utf-8");
  return bytes > 262143;
};

export const sendArticlesBatch = async (articles: any[], feedId: string) => {
  const messages = articles.map((article) =>
    JSON.stringify({ ...article, feedId })
  );
  const filtered = messages.filter((message) => !isBodyTooLong(message));

  for (const MessageBody of filtered) {
    try {
      await sqs
        .sendMessage({
          QueueUrl: ARTICLE_QUEUE!,
          MessageBody,
        })
        .promise();

      // for (const articleChunk of _.chunk(articles, 10)) {
      //   await sqs
      //     .sendMessageBatch({
      //       QueueUrl: ARTICLE_QUEUE!,
      //       Entries: articleChunk.map((e) => ({
      //         Id: ulid(),
      //         MessageBody: JSON.stringify({
      //           ...e,
      //           feedId,
      //         }),
      //       })),
      //     })
      //     .promise();
      // }
    } catch (e) {
      console.log(e);
    }
  }
};
