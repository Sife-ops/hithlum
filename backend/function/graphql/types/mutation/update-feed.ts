import _ from "lodash";
import rss from "rss-parser";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";
import { sendArticlesBatch } from "./common";

const parser = new rss();

builder.mutationFields((t) => ({
  // todo: return feed entity
  updateFeed: t.string({
    args: {
      feedId: t.arg.string({ required: true }),
    },
    resolve: async (__, { feedId }) => {
      const {
        data: {
          ArticleEntity,
          FeedEntity: [feed],
        },
      } = await hithlumModel.collections.feed({ feedId }).go(); // todo: use order option

      const parsed = await parser.parseURL(feed.inputUrl);

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
