import { UserType } from "../user";
import { builder } from "../../builder";
import { fetchUser } from "../common";

builder.queryFields((t) => ({
  user: t.field({
    type: UserType,
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (_, { userId }) => await fetchUser(userId),
  }),
}));
