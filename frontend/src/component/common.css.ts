import { style } from "@vanilla-extract/css";

export const list__item__read = style({
  backgroundColor: "lightgray",
});

export const list__item__unread = style({
  backgroundColor: "rgb(240, 240, 240)",
});

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
