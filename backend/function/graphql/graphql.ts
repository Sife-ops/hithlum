import { GraphQLHandler } from "@serverless-stack/node/graphql";
import { schema } from "./schema";

export const main = GraphQLHandler({
  schema,
  context: async (request) => {
    return {
      user: {
        email: "mock@gmail.com",
        userId: "mock",
      },
    };
  },
});
