import { FeedEntityType } from "@hithlum/core/entity/feed";
import { hithlumModel } from "@hithlum/core/model";
import { builder } from "../builder";
import { FeedType } from "./feed";

export interface UserEntityType {
  userId: string;
  username: string;
  discriminator: string;
  avatarUrl: string;
}

export const UserType = builder.objectRef<UserEntityType>("User");
UserType.implement({
  fields: (t) => ({
    userId: t.exposeID("userId"),
    username: t.exposeString("username"),
    discriminator: t.exposeString("discriminator"),
    avatarUrl: t.exposeString("avatarUrl"),

    following: t.boolean({
      resolve: async (p, _, { user: { userId } }) => {
        const {
          data: [friend],
        } = await hithlumModel.entities.FriendEntity.query
          .user_({
            userId,
          })
          .go();
        if (friend) return true;
        return false;
      },
    }),

    feeds: t.field({
      type: [FeedType],
      resolve: async ({ userId }) => {
        const { data: userFeeds } =
          await hithlumModel.entities.UserFeedEntity.query
            .user_({ userId })
            .go({ order: "desc" });

        let feeds: FeedEntityType[] = [];
        for (const { feedId } of userFeeds) {
          const {
            data: [feed],
          } = await hithlumModel.entities.FeedEntity.query
            .feed({
              feedId,
            })
            .go();
          feeds = [feed, ...feeds];
        }

        return feeds;
      },
    }),
  }),
});
