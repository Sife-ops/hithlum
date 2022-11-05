import got from "got";
import { UserEntityType } from "./user";

const { MANDOS_URL } = process.env;

export const fetchUser = (userId: string) =>
  got
    .post(MANDOS_URL + "/user", {
      json: { userId },
    })
    .json<{
      success: boolean;
      user: UserEntityType;
      message?: string;
    }>()
    .then((res) => {
      if (res.success) return res.user;
      throw new Error(`mandos: ${res.message}`);
    });
