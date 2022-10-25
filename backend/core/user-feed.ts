import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const UserFeedEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "UserFeed",
      service: "hithlum",
    },
    attributes: {
      userFeedId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      userId: {
        type: "string",
        required: true,
      },

      feedId: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      userFeed: {
        pk: {
          field: "pk",
          composite: ["userId"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
    },
  },
  Dynamo.Configuration
);

export type UserFeedEntityType = EntityItem<typeof UserFeedEntity>;
