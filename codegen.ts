import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.graphql",
  documents: "./lib/**/*.{ts,tsx}",
  generates: {
    "./gql/codegen/": {
      preset: "client",
    },
  },
};

export default config;
