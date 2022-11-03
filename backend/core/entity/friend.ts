import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const FriendEntity = new Entity(
  {
    indexes: {
      friend: {
        pk: {
          field: "pk",
          composite: ["friendId"],
        },
        sk: {
          field: "sk",
          composite: [],
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
          composite: ["createdAt"],
        },
      },
    },

    model: {
      version: "1",
      entity: "Friend",
      service: "hithlum",
    },

    attributes: {
      friendId: {
        type: "string",
        required: true,
        default: () => ulid()
      },

      userId: {
        type: "string",
        required: true,
      },

      friendUserId: {
        type: "string",
        required: true,
      },

      createdAt: {
        type: "number",
        required: true,
        default: () => Date.now()
      }

      // friendUserId: {
      //   type: "string",
      //   required: true,
      // },

      // sender: {
      //   type: "boolean",
      //   required: true,
      // },

      // status: {
      //   type: ["pending", "accepted", "rejected"],
      //   required: true,
      // },
    },
  },
  Dynamo.Configuration
);

export type FriendEntityType = EntityItem<typeof FriendEntity>;

// import { UserEntityType } from "./user";
// import { ulid } from "ulid";

// export const sendFriendRequest = async (
//   sender: UserEntityType,
//   recipient: UserEntityType
// ) => {
//   const friendId = ulid();

//   await FriendEntity.create({
//     friendId,
//     userId: sender.userId,
//     friendUserId: recipient.userId,
//     sender: true,
//     status: "pending",
//   }).go();

//   await FriendEntity.create({
//     friendId,
//     userId: recipient.userId,
//     friendUserId: sender.userId,
//     sender: false,
//     status: "pending",
//   }).go();
// };

// export const respondToFriendRequest = async (
//   friendId: string,
//   response: "accepted" | "rejected"
// ) => {
//   const { data: records } = await FriendEntity.query
//     .friend({ friendId })
//     .go();

//   for (const record of records) {
//     await FriendEntity.update(record)
//       .set({
//         status: response,
//       })
//       .go();
//   }
// };
