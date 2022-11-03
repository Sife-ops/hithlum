import { sendArticlesBatch_ } from "./common";
import { expect, it } from "vitest";
import rss from "rss-parser";

const rssParser = new rss();

const sizeOf = (input: string | string[]): number => {
  let bytes = 0;
  if (typeof input === "string") {
    bytes = Buffer.byteLength(input, "utf-8");
  } else {
    for (const message of input) {
      bytes = bytes + Buffer.byteLength(message, "utf-8");
    }
  }
  expect(bytes).toBeLessThan(262144);
  return bytes;
};

const testFeed = async (s: string) => {
  const feed = await rssParser.parseURL(s);

  sendArticlesBatch_(
    feed.items,
    "test",
    async (MessageBody) => {
      console.log("single message size:", sizeOf(MessageBody));
    },
    async (messages) => {
      console.log("batch message size:", sizeOf(messages));
    }
  );
};

it("youtube", async () => {
  await testFeed(
    "https://www.youtube.com/feeds/videos.xml?channel_id=UC3ltptWa0xfrDweghW94Acg"
  );
});

it.only("moe facts", async () => {
  await testFeed("http://feed.nashownotes.com/mfrss.xml");
});

it("the adam friedland show", async () => {
  await testFeed("https://cum-town.blubrry.net/feed/podcast/");
});
