import { UserType } from "../user";
import { builder } from "../../builder";
import { fetchUser } from "../common";

builder.queryFields((t) => ({
  user: t.field({
    type: UserType,
    args: {
      userId: t.arg.string(),
    },
    resolve: async (_, args, { user: { userId } }) => {
      if (args.userId) {
        return await fetchUser(args.userId);
      } else {
        return await fetchUser(userId);
      }
    },
  }),
}));
