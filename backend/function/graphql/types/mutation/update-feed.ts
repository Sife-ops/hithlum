import _ from "lodash";
import rss from "rss-parser";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";
import { sendArticlesBatch } from "./common";

const parser = new rss();

builder.mutationFields((t) => ({
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

      const orderedArticles = _.orderBy(
        ArticleEntity,
        [(article) => article.isoDate],
        ["desc"]
      );

      const parsed = await parser.parseURL(feed.inputUrl);

      const orderedArticles_ = _.orderBy(
        parsed.items,
        [(item) => item.isoDate],
        ["desc"]
      );

      let lastUpdatedIndex: number | null = null;
      for (let i = 0; i < orderedArticles_.length; i++) {
        if (orderedArticles_[i].isoDate === orderedArticles[0].isoDate) {
          lastUpdatedIndex = i;
          break;
        }
      }

      if (lastUpdatedIndex === 0) {
        return "up to date";
      }

      let newArticles = [];
      if (lastUpdatedIndex === null) {
        newArticles = orderedArticles_;
      } else {
        newArticles = orderedArticles_.slice(0, lastUpdatedIndex);
      }

      await sendArticlesBatch(newArticles, feed.feedId);

      return `${newArticles.length} new articles`;
    },
  }),
}));
