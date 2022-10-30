import { hithlumModel } from "@hithlum/core/model";

export const main = async (event: any) => {
  for (const { body } of event.Records) {
    await hithlumModel.entities.ArticleEntity.create(JSON.parse(body)).go();
  }
};
