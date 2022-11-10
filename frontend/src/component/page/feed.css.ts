import { style } from "@vanilla-extract/css";

export const feed__details__container = style({
  padding: ".5rem",
  backgroundColor: "rgb(240, 240, 240)",
  "@media": {
    "screen and (min-width: 481px)": {
      display: "flex",
      gap: ".5rem",
    },
    "screen and (max-width: 480px)": {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
  },
});

export const feed__details__artwork = style({
  objectFit: "cover",
  "@media": {
    "screen and (min-width: 481px)": {
      width: "128px",
      height: "128px",
    },
    "screen and (max-width: 480px)": {
      width: "100%",
      height: "auto",
    },
  },
});

export const feed__details__addedByUser = style({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const feed__details__addedByUser__avatar = style({
  width: "64px",
  height: "64px",
  borderRadius: "50%",
});
