import _ from "lodash";
import AWS from "aws-sdk";
import { ulid } from "ulid";

const sqs = new AWS.SQS();

const { ARTICLE_QUEUE } = process.env;

export const sendArticlesBatch = async (articles: any[], feedId: string) => {
  for (const articleChunk of _.chunk(articles, 10)) {
    await sqs
      .sendMessageBatch({
        QueueUrl: ARTICLE_QUEUE!,
        Entries: articleChunk.map((e) => ({
          Id: ulid(),
          MessageBody: JSON.stringify({
            ...e,
            feedId,
          }),
        })),
      })
      .promise();
  }
};
