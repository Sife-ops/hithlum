import { builder } from "../builder";

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
  }),
});
