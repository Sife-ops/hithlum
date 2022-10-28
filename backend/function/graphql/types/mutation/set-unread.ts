import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";
import { UnreadType } from "../feed";

const { UnreadEntity } = hithlumModel.entities;

builder.mutationFields((t) => ({
  setUnread: t.field({
    type: UnreadType,
    args: {
      feedId: t.arg.string({ required: true }),
      articleId: t.arg.string({ required: true }),
      value: t.arg.boolean({ required: true }),
    },
    resolve: async (_, { articleId, value, feedId }, { user: { userId } }) => {
      const {
        data: [foundUnread],
      } = await UnreadEntity.query.article_({ articleId, userId }).go();

      if (foundUnread) {
        await UnreadEntity.update({
          unreadId: foundUnread.unreadId,
        })
          .set({ value })
          .go();

        const {
          data: [updated],
        } = await UnreadEntity.query.article_({ articleId, userId }).go();

        return updated;
      } else {
        const { data } = await UnreadEntity.create({
          articleId,
          feedId,
          userId,
        }).go();

        return data;
      }
    },
  }),
}));
