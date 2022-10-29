import { builder } from "../../builder";

builder.mutationFields((t) => ({
  updateFeed: t.string({
    resolve: async (_, { feedUrl }, { user: { userId } }) => {
      return "todo: update feed";
    },
  }),
}));
