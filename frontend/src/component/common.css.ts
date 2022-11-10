import { style } from "@vanilla-extract/css";

export const page = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const list__item = style({
  padding: ".5rem",
});

export const list__item__read = style([
  { backgroundColor: "lightgray" },
  list__item,
]);

export const list__item__unread = style([
  { backgroundColor: "rgb(240, 240, 240)" },
  list__item,
]);

export const list__container = style({
  gap: "1rem",
  "@media": {
    "screen and (min-width: 481px)": {
      display: "grid",
      gridTemplateColumns: `1fr 1fr 1fr;`,
    },
    "screen and (max-width: 480px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
});
