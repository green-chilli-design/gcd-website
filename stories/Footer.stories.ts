/**
 * This contains thhe storybook configuration for the Footer component. (components/Footer.tsx)
 */

// import Footer from "../components/ui/accordion";
import type { StoryObj, Meta } from "@storybook/react";
import Footer from "@/app/components/Footer";

const meta: Meta<typeof Footer> = {
  title: "Footer",
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Primary: Story = {
  // Here is where we list the props that we want to pass to the component.
  args: {
    title: "Footer",
  },
};

export const Warning: Story = {
  args: {
    primary: true,
    label: "Delete now",
    backgroundColor: "red",
  },
};
