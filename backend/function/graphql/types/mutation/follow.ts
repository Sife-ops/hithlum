import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";
import { UserType } from "../user";
import { fetchUser } from "../common";

const { FriendEntity } = hithlumModel.entities;

builder.mutationFields((t) => ({
  follow: t.field({
    type: UserType,
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (_, args, { user: { userId } }) => {
      try {
        await FriendEntity.create({
          userId,
          friendUserId: args.userId,
        }).go();
        return await fetchUser(args.userId);
      } catch {
        throw new Error("already following");
      }
    },
  }),

  unfollow: t.field({
    type: UserType,
    args: {
      userId: t.arg.string({ required: true }),
    },
    resolve: async (_, args, { user: { userId } }) => {
      const { data: friends } = await FriendEntity.query.user_({ userId }).go();
      const friend = friends.find(
        (friend) => friend.friendUserId === args.userId
      );
      if (!friend) throw new Error("already not following");
      await FriendEntity.remove(friend).go();
      return await fetchUser(args.userId);
    },
  }),
}));
