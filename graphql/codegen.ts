import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/codegen",
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
