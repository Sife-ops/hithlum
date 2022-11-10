import * as styleCommon from "./common.css";
import { Article } from "@hithlum/graphql/urql";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

export const ArticlePreview: React.FC<{ article: Article }> = ({ article }) => {
  const unread = article.unread.value;
  return (
    <div
      className={
        unread //
          ? styleCommon.list__item__unread
          : styleCommon.list__item__read
      }
    >
      <div>
        <Link to={"/article/" + article.articleId}>{article.title}</Link>
      </div>
      <div>{article.summary}</div>
      <div>
        {formatDistance(new Date(article.isoDate!), new Date(), {
          addSuffix: true,
        })}
      </div>
    </div>
  );
};
