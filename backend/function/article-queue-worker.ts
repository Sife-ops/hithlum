import { hithlumModel } from "@hithlum/core/model";

export const main = async (event: any) => {
  for (const { body } of event.Records) {
    const { feedId, title } = JSON.parse(body);
    await hithlumModel.entities.ArticleEntity.create({ feedId, title }).go();
  }
};
