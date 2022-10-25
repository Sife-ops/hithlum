import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const ArticleEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Article",
      service: "hithlum",
    },
    attributes: {
      feedId: {
        type: "string",
        required: true,
      },

      articleId: {
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
      article: {
        pk: {
          field: "pk",
          composite: ["feedId", "articleId"],
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

export type ArticleEntityType = EntityItem<typeof ArticleEntity>;
