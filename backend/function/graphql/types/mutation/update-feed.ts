import _ from "lodash";
import rss from "rss-parser";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";
import { sendArticlesBatch } from "./common";

const parser = new rss();

builder.mutationFields((t) => ({
  // todo: return feed entity
  // todo: move whole thing to sqs
  updateFeed: t.string({
    args: {
      feedId: t.arg.string({ required: true }),
    },
    resolve: async (__, { feedId }) => {
      const {
        data: {
          FeedEntity: [feed],
          ArticleEntity,
        },
      } = await hithlumModel.collections.feed({ feedId }).go(); // todo: use order option
      const parsed = await parser.parseURL(feed.inputUrl);

      // update feed
      await hithlumModel.entities.FeedEntity.update({
        feedId: feed.feedId,
      })
        .set({
          imageUrl: parsed.image?.url || "",
          itunesImage: parsed.itunes?.image || "",
        })
        .go();

      // update articles
      const filtered = parsed.items.filter(
        (item) => !ArticleEntity.find((article) => article.title === item.title)
      );
      if (filtered.length < 1) {
        return "up to date";
      }
      const ordered = _.orderBy(filtered, [(item) => item.isoDate], ["desc"]);
      await sendArticlesBatch(ordered, feed.feedId);
      return `${ordered.length} new articles`;
    },
  }),
}));
