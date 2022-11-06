import { hithlumModel } from "@hithlum/core/model";
import { z } from "zod";

const eventSchema = z.object({
  userId: z.string(),
  role: z.string(),
});

export const main = async (event: any) => {
  const { role, userId } = eventSchema.parse(JSON.parse(event.body));

  await hithlumModel.entities.RoleEntity.create({
    userId,
    role,
  }).go();
};
