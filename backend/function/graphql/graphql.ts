import got from "got";
import { GraphQLHandler } from "@serverless-stack/node/graphql";
import { decode } from "jsonwebtoken";
import { schema } from "./schema";
import { hithlumModel } from "@hithlum/core/model";

const { MANDOS_URL } = process.env;

export const main = async (
  event: any,
  context: any
): Promise<
  | {
      statusCode: number;
      body: string;
      headers: {
        [k: string]: string;
      };
    }
  | {
      statusCode: number;
      body?: undefined;
      headers?: undefined;
    }
> => {
  try {
    const accessToken = event.headers.authorization;

    const url = `${MANDOS_URL}/verify`;
    const res = await got.post(url, { json: { accessToken } }).json<{
      success: boolean;
      message?: string;
    }>();

    if (!res.success) throw new Error(`mandos: ${res.message}`);

    const { email, userId } = decode(accessToken) as {
      email: string;
      userId: string;
    };

    /**
     * default subscription
     */
    await hithlumModel.entities.UserEntity.query
      .user({ userId })
      .go()
      .then(async ({ data: [user] }) => {
        if (user) return;
        await hithlumModel.entities.UserEntity.create({
          userId,
        })
          .go()
          .then(async ({ data: user }) => {
            await hithlumModel.entities.FeedEntity.query
              .feedUrl_({
                feedUrl: "http://feed.nashownotes.com/rss.xml",
              })
              .go()
              .then(async ({ data: [defaultFeed] }) => {
                if (!defaultFeed) return;
                await hithlumModel.entities.UserFeedEntity.create({
                  feedId: defaultFeed.feedId,
                  userId: user.userId,
                }).go();
              });
          });
      });

    return GraphQLHandler({
      schema,
      context: async (request) => {
        return {
          ...request,
          user: {
            userId,
            email,
          },
        };
      },
    })(event, context);
  } catch (e) {
    console.log(e);

    return {
      statusCode: 401,
      headers: {},
      body: "unauthorized",
    };
  }
};
