import { style } from "@vanilla-extract/css";

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
