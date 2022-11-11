import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});

export const avatar = style({
  width: "64px",
  height: "64px",
  borderRadius: "50%",
});
