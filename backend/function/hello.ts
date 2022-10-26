import { hithlumModel } from "@hithlum/core/model";

export const main = async (event: any) => {
  // hithlumModel.entities.FeedEntity.

  const a = await hithlumModel.entities.FeedEntity.create({
    data: "a",
  });

  // console.log(feed);

  // const a = hithlumModel.entities.ArticleEntity.query.article({
  // })

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };
};
