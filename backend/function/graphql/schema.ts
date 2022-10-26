import { hithlumModel } from "@hithlum/core/model";
import { FeedEntityType } from "@hithlum/core/entity/feed";

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";

const feedType = new GraphQLObjectType({
  name: "Feed",
  fields: {
    feedId: { type: GraphQLString },
    data: { type: GraphQLString },
  },
});

export const schema = new GraphQLSchema({
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
      feeds: {
        type: new GraphQLList(feedType),
        resolve: async (source, args, { user: userId }, info) => {
          const { data: userFeeds } =
            await hithlumModel.entities.UserFeedEntity.query
              .user_({ userId })
              .go();

          let feeds: FeedEntityType[] = [];
          for (const userFeed of userFeeds) {
            const {
              data: [feed],
            } = await hithlumModel.entities.FeedEntity.query
              .feed({
                feedId: userFeed.feedId,
              })
              .go();
            feeds = [...feeds, feed];
          }

          return feeds;
        },
      },
    },
  }),
});
