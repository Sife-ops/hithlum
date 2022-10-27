import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const ViewedEntity = new Entity(
  {
    indexes: {
      Viewed: {
        pk: {
          field: "pk",
          composite: ["viewedId"],
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
          composite: ["entityId"],
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
    },

    model: {
      version: "1",
      entity: "Viewed",
      service: "hithlum",
    },

    attributes: {
      viewedId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      userId: {
        type: "string",
        required: true,
      },

      entityId: {
        type: "string",
        required: true,
      },

      viewed: {
        type: "boolean",
        required: true,
        default: () => true,
      },
    },
  },
  Dynamo.Configuration
);

export type ViewedEntityType = EntityItem<typeof ViewedEntity>;
