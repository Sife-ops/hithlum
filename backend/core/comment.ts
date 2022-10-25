import { Dynamo } from "./dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const CommentEntity = new Entity(
  {
    indexes: {
      comment: {
        pk: {
          field: "pk",
          composite: ["commentId"],
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
      entity: "Comment",
      service: "hithlum",
    },

    attributes: {
      commentId: {
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

      comment: {
        type: "string",
        required: true,
      },
    },
  },
  Dynamo.Configuration
);

export type CommentEntityType = EntityItem<typeof CommentEntity>;
