"use client";

import { useTheme } from "next-themes";

export default function ThemedButton({
  text,
  onClick,
}: {
  text: string;
  onClick: any;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn w-32 ${
        resolvedTheme === "dark" ? "light text-black" : "dark text-neutral"
      }`}
    >
      {text}
    </button>
  );
}
