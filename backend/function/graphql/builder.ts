import SchemaBuilder from "@pothos/core";

export const builder = new SchemaBuilder<{
  Context: {
    user: {
      userId: string;
      email: string;
    };
  };
}>({});

builder.queryType({});
builder.mutationType({});
