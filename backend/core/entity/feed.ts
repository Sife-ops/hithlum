import { Dynamo } from "../dynamo";
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
          composite: ["createdAt"],
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

      inputUrl: {
        type: "string",
        required: true,
      },

      createdAt: {
        type: "number",
        required: true,
        default: () => Date.now(),
      },

      private: {
        type: "boolean",
        required: true,
        default: () => false,
      },

      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////

      feedUrl: { type: "string" },

      // todo: feed fields
      // image: {
      //   link: 'https://www.patreon.com/cumtownRSS',
      //   url: 'https://c10.patreonusercontent.com/4/patreon-media/p/campaign/2107286/cdb73e31728f40c28d0609887d5f5a9a/eyJ3Ijo0MDB9/1?token-time=2145916800&token-hash=-p3qHOYzRhQRzjDsOAEUEAEW0HVXeaqixL-Ob170LoE%3D',
      //   title: 'cum town RSS'
      // },
      // paginationLinks: { self: 'https://www.patreon.com/rss/2107286' },

      imageUrl: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      // pubDate: { type: "string" },
      link: { type: "string" },
      // language: { type: "string" },
      // lastBuildDate: { type: "string" },

      // itunes: {
      //   owner: { name: 'cum town RSS', email: 'support@patreon.com' },
      //   image: 'https://c10.patreonusercontent.com/4/patreon-media/p/campaign/2107286/cdb73e31728f40c28d0609887d5f5a9a/eyJ3Ijo0MDB9/1?token-time=2145916800&token-hash=-p3qHOYzRhQRzjDsOAEUEAEW0HVXeaqixL-Ob170LoE%3D',
      //   author: 'cum town RSS'
      // }
    },
  },
  Dynamo.Configuration
);

export type FeedEntityType = EntityItem<typeof FeedEntity>;
