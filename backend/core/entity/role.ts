import { Dynamo } from "../dynamo";
import { Entity, EntityItem } from "electrodb";
import { ulid } from "ulid";

export const RoleEntity = new Entity(
  {
    indexes: {
      role: {
        pk: {
          field: "pk",
          composite: ["roleId"],
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
    },

    model: {
      version: "1",
      entity: "Role",
      service: "hithlum",
    },

    attributes: {
      roleId: {
        type: "string",
        required: true,
        default: () => ulid(),
      },

      userId: {
        type: "string",
        required: true,
      },

      role: {
        type: "string",
        required: true,
      },
    },
  },
  Dynamo.Configuration
);

export type RoleEntityType = EntityItem<typeof RoleEntity>;
