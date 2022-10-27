import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const UnreadEntity = new Entity(
  {
    indexes: {
      unread: {
        pk: {
          field: "pk",
          composite: ["unreadId"],
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
          composite: ["feedId", "articleId"],
        },
      },

      feed_: {
        collection: "feed",
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["feedId"],
        },
        sk: {
          field: "gsi2sk",
          composite: ["articleId"],
        },
      },

      article_: {
        collection: "article",
        index: "gsi3",
        pk: {
          field: "gsi3pk",
          composite: ["articleId"],
        },
        sk: {
          field: "gsi3sk",
          composite: ["userId"],
        },
      },
    },

    model: {
      version: "1",
      entity: "Unread",
      service: "hithlum",
    },

    attributes: {
      unreadId: {
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

      articleId: {
        type: "string",
        required: true,
      },

      value: {
        type: "boolean",
        required: true,
        default: () => false,
      },
    },
  },
  Dynamo.Configuration
);

export type UnreadEntityType = EntityItem<typeof UnreadEntity>;
