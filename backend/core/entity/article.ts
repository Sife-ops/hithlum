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
          composite: ["isoDate"],
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
          // todo: can use createdAt?
          composite: ["isoDate"],
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

      content: { type: "string" },
      contentSnippet: { type: "string" },
      creator: { type: "string" },
      guid: { type: "string" },
      isoDate: {
        type: "string",
        required: true,
        default: () => new Date().toISOString(),
      },
      link: { type: "string" },
      pubDate: { type: "string" },
      summary: { type: "string" },
      title: { type: "string" },

      // enclosure: {
      //   url: 'https://chtbl.com/track/E2288/traffic.megaphone.fm/STA1441745471.mp3',
      //   length: '0',
      //   type: 'audio/mpeg'
      // },
      enclosureUrl: { type: "string" },
      enclosureLength: { type: "string" },
      enclosureType: { type: "string" },

      // todo: categories
      // categories: { type: "string" },
    },
  },
  Dynamo.Configuration
);

export type ArticleEntityType = EntityItem<typeof ArticleEntity>;
