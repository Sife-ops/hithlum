import AWS from "aws-sdk";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";

const { ARTWORK_BUCKET } = process.env;
const S3 = new AWS.S3();

builder.mutationFields((t) => ({
  changeArtwork: t.boolean({
    args: {
      feedId: t.arg.string({ required: true }),
      artwork: t.arg.string({ required: true }),
    },
    resolve: async (_, { feedId, artwork }, { user: { userId } }) => {
      // todo: confirm role
      const type = artwork.split(";")[0].split("/")[1];
      const buffer = Buffer.from(
        artwork.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      await S3.putObject({
        Bucket: ARTWORK_BUCKET!,
        Key: feedId,
        Body: buffer,
        ContentEncoding: "base64",
        ContentType: `image/${type}`,
      }).promise();

      await hithlumModel.entities.FeedEntity.update({
        feedId,
      })
        .set({
          hasCustomArtwork: true,
        })
        .go();

      return true;
    },
  }),
}));
