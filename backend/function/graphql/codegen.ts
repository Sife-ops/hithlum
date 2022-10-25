import type { Handler } from "aws-lambda";
import { ApolloServer, gql } from "apollo-server-lambda";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { schema } from "./schema";

export const main: Handler<any, any> = async (event, context, callback) => {
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    // context: (ctx) => {
    //   return {
    //     ...ctx,
    //     user: {
    //       email,
    //       userId,
    //     },
    //   };
    // },
  });

  return server.createHandler()(event, context, callback);
};
