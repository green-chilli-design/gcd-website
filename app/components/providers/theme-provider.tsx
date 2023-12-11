"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // set theme based on page
  let defaultTheme = "light";
  const pathname = usePathname();
  if (pathname === "/case-studies") {
    defaultTheme = "dark";
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
