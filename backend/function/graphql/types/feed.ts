import { FeedEntityType } from "@hithlum/core/entity/feed";
import { builder } from "../builder";

export const FeedType = builder.objectRef<FeedEntityType>("Feed");
FeedType.implement({
  fields: (t) => ({
    feedId: t.exposeID("feedId"),
    feedUrl: t.exposeString("title", { nullable: true }),
    title: t.exposeString("title", { nullable: true }),
    inputUrl: t.exposeString("inputUrl", { nullable: true }),
  }),
});
