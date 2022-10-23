import axios from "axios";
import type { Handler } from "aws-lambda";
import { ApolloServer, gql } from "apollo-server-lambda";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { decode } from "jsonwebtoken";
import { env } from "../common";

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => {
          return "world";
        },
      },
      world: {
        type: GraphQLString,
        resolve: () => {
          return "hello";
        },
      },
    },
  }),
});

export const main: Handler<any, any> = async (event, context, callback) => {
  try {
    const accessToken = event.headers.authorization;

    const res = await axios.post(env("MANDOS_URL") + "/verify", {
      accessToken,
    });

    if (res.data.success) {
      const { email, userId } = decode(accessToken) as {
        email: string;
        userId: string;
      };

      const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
        context: (ctx) => {
          return {
            ...ctx,
            user: {
              email,
              userId,
            },
          };
        },
      });

      return server.createHandler()(event, context, callback);
    } else {
      throw new Error(`mandos: ${res.data.message}`);
    }
  } catch (e) {
    console.log(e);
    return {
      statusCode: 401,
      headers: {},
      body: JSON.stringify({ errors: [{ message: "unauthorized" }] }),
    };
  }
};
