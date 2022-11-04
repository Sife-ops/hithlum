import { style } from "@vanilla-extract/css";

export const userPreview__artwork = style({
  borderRadius: "50%",
  "@media": {
    "screen and (min-width: 481px)": {
      width: "128px",
      height: "128px",
    },
    "screen and (max-width: 480px)": {
      width: "64px",
      height: "64px",
    },
  },
});
