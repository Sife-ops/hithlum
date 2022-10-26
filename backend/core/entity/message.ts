import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const MessageEntity = new Entity(
  {
    indexes: {
      conversation: {
        pk: {
          field: "pk",
          composite: ["friendshipId"],
        },
        sk: {
          field: "sk",
          composite: ["messageId"],
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
      entity: "Message",
      service: "hithlum",
    },

    attributes: {
      messageId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      friendshipId: {
        type: "string",
        required: true,
      },

      message: {
        type: "string",
        required: true,
      },
    },
  },
  Dynamo.Configuration
);

export type MessageEntityType = EntityItem<typeof MessageEntity>;
