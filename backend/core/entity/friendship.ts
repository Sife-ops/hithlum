import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
//

export const FriendshipEntity = new Entity(
  {
    indexes: {
      friendship: {
        pk: {
          field: "pk",
          composite: ["friendshipId"],
        },
        sk: {
          field: "sk",
          composite: ["userId"],
        },
      },

      user_: {
        collection: "user",
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["userId"],
        },
        sk: {
          field: "gsi1sk",
          composite: [],
        },
      },
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
    },

    model: {
      version: "1",
      entity: "Friendship",
      service: "hithlum",
    },

    attributes: {
      friendshipId: {
        type: "string",
        required: true,
      },

      userId: {
        type: "string",
        required: true,
      },

      friendUserId: {
        type: "string",
        required: true,
      },

      sender: {
        type: "boolean",
        required: true,
      },

      status: {
        type: ["pending", "accepted", "rejected"],
        required: true,
      },
    },
  },
  Dynamo.Configuration
);

export type FriendshipEntityType = EntityItem<typeof FriendshipEntity>;

import { UserEntityType } from "./user";
import { ulid } from "ulid";

export const sendFriendRequest = async (
  sender: UserEntityType,
  recipient: UserEntityType
) => {
  const friendshipId = ulid();

  await FriendshipEntity.create({
    friendshipId,
    userId: sender.userId,
    friendUserId: recipient.userId,
    sender: true,
    status: "pending",
  }).go();

  await FriendshipEntity.create({
    friendshipId,
    userId: recipient.userId,
    friendUserId: sender.userId,
    sender: false,
    status: "pending",
  }).go();
};

export const respondToFriendRequest = async (
  friendshipId: string,
  response: "accepted" | "rejected"
) => {
  const { data: records } = await FriendshipEntity.query
    .friendship({ friendshipId })
    .go();

  for (const record of records) {
    await FriendshipEntity.update(record)
      .set({
        status: response,
      })
      .go();
  }
};
