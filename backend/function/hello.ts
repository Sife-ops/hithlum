import { hithlumModel } from "@hithlum/core/model";

export const main = async (event: any) => {
  await hithlumModel.entities.RoleEntity.create({
    userId: event.userId,
    role: event.role,
  }).go();

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
