import { Service } from "electrodb";

import { FeedEntity } from "./entity/feed";
import { ArticleEntity } from "./entity/article";
import { UserEntity } from "./entity/user";
import { UserFeedEntity } from "./entity/user-feed";

export const hithlumModel = new Service({
  FeedEntity,
  ArticleEntity,
  UserEntity,
  UserFeedEntity,
});
