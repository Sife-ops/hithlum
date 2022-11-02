import got from "got";
import { UserEntityType } from "./user";

const { MANDOS_URL } = process.env;

export const fetchUser = async (userId: string) => {
  const res = await got
    .post(MANDOS_URL + "/user", {
      json: { userId },
    })
    .json<{
      success: boolean;
      user: UserEntityType;
      message?: string;
    }>();
  if (!res.success) throw new Error(`mandos: ${res.message}`);
  return res.user;
};

// todo: fetchUsers
