import { Service } from "electrodb";

import { FeedEntity } from "./feed";
import { ArticleEntity } from "./article";
import { UserEntity } from "./user";
import { UserFeedEntity } from "./user-feed";

export const hithlumModel = new Service({
  FeedEntity,
  ArticleEntity,
  UserEntity,
  UserFeedEntity,
});
