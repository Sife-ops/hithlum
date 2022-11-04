import _ from "lodash";
import rss from "rss-parser";
import { FeedType } from "../feed";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";

const parser = new rss();

builder.mutationFields((t) => ({
  // todo: move whole thing to sqs
  updateFeed: t.field({
    type: FeedType,
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

      // update articles
      const filtered = parsed.items.filter(
        (item) => !ArticleEntity.find((article) => article.title === item.title)
      );
      if (filtered.length < 1) {
        return feed;
      }
      // const ordered = _.orderBy(filtered, [(item) => item.isoDate], ["desc"]);

      // await sendArticlesBatch(ordered, feed.feedId);
      await Promise.all(
        filtered.map((article) =>
          hithlumModel.entities.ArticleEntity.create({
            ...article,
            feedId: feed.feedId,
          }).go()
        )
      );

      // update feed
      // const { data: updated } = await hithlumModel.entities.FeedEntity.update({
      await hithlumModel.entities.FeedEntity.update({
        feedId: feed.feedId,
      })
        .set({
          imageUrl: parsed.image?.url || "",
          itunesImage: parsed.itunes?.image || "",
        })
        .go();

      const {
        data: [updated],
      } = await hithlumModel.entities.FeedEntity.query
        .feed({ feedId: feed.feedId })
        .go();

      return updated;
    },
  }),
}));
