import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://wy71j6hxx1.execute-api.us-east-1.amazonaws.com/dev/graphql",
  documents: "../frontend/src/**/*.tsx",
  ignoreNoDocuments: true,
  generates: {
    "gql/": {
      preset: "client",
      plugins: [],
    },
    "urql.tsx": {
      plugins: ["typescript", "typescript-operations", "typescript-urql"],
    },
  },
};

export default config;
