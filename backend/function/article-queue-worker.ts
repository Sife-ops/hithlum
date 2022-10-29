import { hithlumModel } from "@hithlum/core/model";

export const main = async (event: any) => {
  for (const { body } of event.Records) {
    const parsedBody = JSON.parse(body);

    let isoDate_millis: number | undefined = undefined;
    const parsedDate = Date.parse(parsedBody.isoDate);
    if (typeof parsedDate === "number") isoDate_millis = parsedDate;

    await hithlumModel.entities.ArticleEntity.create({
      ...parsedBody,
      isoDate_millis,
    }).go();
  }
};
