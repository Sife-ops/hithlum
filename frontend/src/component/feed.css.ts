import { style } from "@vanilla-extract/css";

export const feedPreview__container = style({
  display: "flex",
});

export const feedPreview__container__unread = style([
  feedPreview__container,
  {
    backgroundColor: "rgb(240, 240, 240)",
  },
]);

export const feedPreview__container__read = style([
  feedPreview__container,
  {
    backgroundColor: "lightgray",
  },
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
