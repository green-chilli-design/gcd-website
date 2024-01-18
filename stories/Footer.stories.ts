/**
 * This contains thhe storybook configuration for the Footer component. (components/Footer.tsx)
 */

import type { StoryObj, Meta } from "@storybook/react";
import Footer from "@/app/components/Footer";

const meta: Meta<typeof Footer> = {
  title: "GCD/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

// Export the default story (only 1 version of footer).

export const Default: Story = {
  args: {},
};
