import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const RatingEntity = new Entity(
  {
    indexes: {
      rating: {
        pk: {
          field: "pk",
          composite: ["ratingId"],
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
    },

    model: {
      version: "1",
      entity: "Rating",
      service: "hithlum",
    },

    attributes: {
      ratingId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      userId: {
        type: "string",
        required: true,
      },

      articleId: {
        type: "string",
        required: true,
      },

      rating: {
        type: "number",
        required: true,
      },
    },
  },
  Dynamo.Configuration
);

export type RatingEntityType = EntityItem<typeof RatingEntity>;
