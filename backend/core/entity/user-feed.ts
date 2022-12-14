import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const UserFeedEntity = new Entity(
  {
    indexes: {
      userFeed: {
        pk: {
          field: "pk",
          composite: ["userFeedId"],
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

      feed_: {
        //
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["feedId"],
        },
        sk: {
          field: "gsi2sk",
          composite: ["userId"],
        },
      },
    },

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

      createdAt: {
        type: "number",
        required: true,
        default: () => Date.now(),
      },
    },
  },
  Dynamo.Configuration
);

export type UserFeedEntityType = EntityItem<typeof UserFeedEntity>;
