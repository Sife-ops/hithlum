import { ArticleType } from "../article";
import { builder } from "../../builder";
import { hithlumModel } from "@hithlum/core/model";

const { ArticleEntity } = hithlumModel.entities;

builder.queryFields((t) => ({
  article: t.field({
    type: ArticleType,
    args: {
      articleId: t.arg.string({ required: true }),
    },
    resolve: (_, { articleId }) =>
      ArticleEntity.query
        .article({ articleId })
        .go()
        .then((res) => res.data[0]),
  }),
}));
