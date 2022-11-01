import _ from "lodash";
import AWS from "aws-sdk";
import { ArticleType } from "./article";
import { FeedEntityType } from "@hithlum/core/entity/feed";
import { builder } from "../builder";
import { hithlumModel } from "@hithlum/core/model";

const { ArticleEntity, UserFeedEntity } = hithlumModel.entities;
const s3 = new AWS.S3();
const { ARTWORK_BUCKET, STAGE } = process.env;

export const FeedType = builder.objectRef<FeedEntityType>("Feed");
FeedType.implement({
  fields: (t) => ({
    feedId: t.exposeID("feedId"),
    inputUrl: t.exposeString("inputUrl"),
    hasCustomArtwork: t.exposeBoolean("hasCustomArtwork"),
    createdAt: t.string({
      resolve: (p) => p.createdAt.toString(),
    }),

    feedUrl: t.exposeString("feedUrl", { nullable: true }),
    title: t.exposeString("title", { nullable: true }),
    description: t.exposeString("description", { nullable: true }),
    link: t.exposeString("link", { nullable: true }),

    image: t.string({
      resolve: async (p) => {
        if (p.imageUrl) return p.imageUrl;
        if (p.itunesImage) return p.itunesImage;
        if (STAGE === "local") return "";
        if (!p.hasCustomArtwork) return "";
        try {
          const params = {
            Key: p.feedId + ".png",
            Bucket: ARTWORK_BUCKET!,
          };

          await s3.headObject(params).promise();
          return s3.getSignedUrl("getObject", { ...params, Expires: 900 });
        } catch {
          console.log("artwork unavailable for feed: " + p.feedId);
          return "";
        }
      },
    }),

    subscribed: t.boolean({
      resolve: ({ feedId }, __, { user: { userId } }) =>
        UserFeedEntity.query
          .feed_({ feedId, userId })
          .go()
          .then((e) => {
            if (e.data.length > 0) return true;
            else return false;
          }),
    }),

    latestArticle: t.field({
      type: ArticleType,
      resolve: ({ feedId }) =>
        ArticleEntity.query
          .feed_({ feedId })
          .go({ order: "desc", limit: 1 })
          .then((e) => e.data[0]),
    }),

    // can't use loader
    articles: t.field({
      type: [ArticleType],
      resolve: ({ feedId }) =>
        ArticleEntity.query
          .feed_({ feedId })
          .go({ order: "desc" })
          .then((e) => e.data),
    }),
  }),
});
