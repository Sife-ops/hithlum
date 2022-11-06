import got from "got";
import { z } from "zod";

const { MANDOS_URL } = process.env;

const eventSchema = z.object({
  refreshToken: z.string(),
});

export const main = async (event: any) => {
  try {
    const { refreshToken } = eventSchema.parse(JSON.parse(event.body));

    const url = `${MANDOS_URL}/refresh`;
    const res = await got.post(url, { json: { refreshToken } }).json<{
      success: boolean;
      message?: string;
    }>();

    return res;
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: e,
    };
  }
};
