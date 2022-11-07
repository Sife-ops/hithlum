import { style } from "@vanilla-extract/css";
import * as styleCommon from "./common.css";

export const feedPreview__container = style({
  display: "flex",
  gap: ".5rem",
});

export const feedPreview__container__read = style([
  feedPreview__container,
  styleCommon.list__item__read,
]);

export const feedPreview__container__unread = style([
  feedPreview__container,
  styleCommon.list__item__unread,
]);

export const feedPreview__artwork = style({
  "@media": {
    "screen and (min-width: 481px)": {
      width: "128px",
      height: "128px",
    },
    "screen and (max-width: 480px)": {
      width: "48px",
      height: "48px",
    },
  },
});
