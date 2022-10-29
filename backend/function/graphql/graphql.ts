import got from "got";
import { GraphQLHandler } from "@serverless-stack/node/graphql";
import { decode } from "jsonwebtoken";
import { schema } from "./schema";

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
    const res = await got.post(url, { json: { accessToken } }).json<any>();

    if (!res.success) throw new Error(`mandos: ${res.message}`);

    const { email, userId } = decode(accessToken) as {
      email: string;
      userId: string;
    };

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
      body: JSON.stringify({ errors: [{ message: "unauthorized" }] }),
    };
  }
};
