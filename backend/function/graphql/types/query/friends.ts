import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";

builder.queryFields((t) => ({
  friends: t.stringList({
    resolve: (_, __, { user: { userId } }) =>
      hithlumModel.entities.FriendEntity.query
        .user_({ userId })
        .go({ order: "desc" })
        .then(({ data: friends }) => friends.map((friend) => friend.friendUserId)),
  }),
}));
