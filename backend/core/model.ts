import { Service } from "electrodb";

import { ArticleEntity } from "./entity/article";
import { CommentEntity } from "./entity/comment";
import { FeedEntity } from "./entity/feed";
import { FriendEntity } from "./entity/friend";
import { MessageEntity } from "./entity/message";
import { RatingEntity } from "./entity/rating";
import { UserEntity } from "./entity/user";
import { UserFeedEntity } from "./entity/user-feed";
import { UnreadEntity } from "./entity/unread";

export const hithlumModel = new Service({
  ArticleEntity,
  CommentEntity,
  FeedEntity,
  FriendEntity,
  MessageEntity,
  RatingEntity,
  UserEntity,
  UserFeedEntity,
  UnreadEntity,
});
