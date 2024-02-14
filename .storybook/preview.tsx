import "!style-loader!css-loader!postcss-loader!tailwindcss/tailwind.css";
import "@/app/globals.css";
import { Jost } from "next/font/google";
import "tailwindcss/tailwind.css";

import type { Preview } from "@storybook/react";
import React from "react";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <main className={jost.className}>
        <Story />
      </main>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
