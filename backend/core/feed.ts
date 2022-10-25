import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const FeedEntity = new Entity(
  {
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
      feed_: {
        collection: "feed",
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["feedId"],
        },
        sk: {
          field: "gsi2sk",
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
    },

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
  },
  Dynamo.Configuration
);

export type FeedEntityType = EntityItem<typeof FeedEntity>;
