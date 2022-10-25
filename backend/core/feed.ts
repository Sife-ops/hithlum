import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const FeedEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Feed",
      service: "hithlum",
    },
    attributes: {
      feedId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      data: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      feed: {
        pk: {
          field: "pk",
          composite: ["feedId"],
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

export type FeedEntityType = EntityItem<typeof FeedEntity>;
