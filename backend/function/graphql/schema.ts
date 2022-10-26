import { builder } from "./builder";

builder.queryFields((t) => ({
  hello: t.string({
    resolve: () => "hello",
  }),
}));

builder.mutationFields((t) => ({
  mello: t.string({
    resolve: () => "mello",
  }),
}));

export const schema = builder.toSchema({});
