import { Service } from "electrodb";

import { FeedEntity } from "./feed";
import { ArticleEntity } from "./entity/article";
import { UserEntity } from "./user";
import { UserFeedEntity } from "./user-feed";

export const hithlumModel = new Service({
  FeedEntity,
  ArticleEntity,
  UserEntity,
  UserFeedEntity,
});
