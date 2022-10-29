import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Article as ArticleType,
  useArticleQuery,
  useSetUnreadMutation,
} from "@hithlum/graphql/urql";

export const Article = () => {
  const { articleId } = useParams();

  // todo: redirect if articleId undefined
  const [articleQueryState] = useArticleQuery({
    variables: { articleId: articleId! },
  });
  const [article, setArticle] = useState<ArticleType>();

  useEffect(() => {
    const { fetching, data } = articleQueryState;
    if (!fetching && data) {
      setArticle(data.article);
    }
  }, [articleQueryState.data]);

  const [_, setUnread] = useSetUnreadMutation();

  useEffect(() => {
    // todo: redirect if articleId undefined
    setUnread({ articleId: articleId!, value: false });
  }, []);

  return (
    <div>
      {article && (
        <div>
          <h3>{article.title}</h3>
          <div>{article.link}</div>
          <div>{article.isoDate}</div>
        </div>
      )}
    </div>
  );
};
