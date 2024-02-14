import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",

    options: {
      nextConfigPath: path.resolve(__dirname, "../next.config.js"),
    },
  },
  staticDirs: ["../public"],
  webpackFinal: async (config: any) => {
    // Add path aliases
    config.resolve.alias["@/app"] = path.resolve(__dirname, "../app");
    config.resolve.alias["@/components"] = path.resolve(
      __dirname,
      "../app/components",
    );
    config.resolve.alias["@/public"] = path.resolve(__dirname, "../public");
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
    });
    return config;
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
