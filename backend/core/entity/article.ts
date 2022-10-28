import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const ArticleEntity = new Entity(
  {
    indexes: {
      article: {
        pk: {
          field: "pk",
          composite: ["articleId"],
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

      article_: {
        collection: "article",
        index: "gsi3",
        pk: {
          field: "gsi3pk",
          composite: ["articleId"],
        },
        sk: {
          field: "gsi3sk",
          composite: [],
        },
      },

      recent_: {
        collection: "recent",
        index: "gsi4",
        pk: {
          field: "gsi4pk",
          composite: [],
        },
        sk: {
          field: "gsi4sk",
          composite: ["createdAt"],
        },
      },
    },

    model: {
      version: "1",
      entity: "Article",
      service: "hithlum",
    },

    attributes: {
      articleId: {
        type: "string",
        required: true,
        default: () => ulid(),
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

      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////

      title: { type: "string" },
    },
  },
  Dynamo.Configuration
);

export type ArticleEntityType = EntityItem<typeof ArticleEntity>;
