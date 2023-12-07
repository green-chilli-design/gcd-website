"use client";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

export default function ProvidersTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  // set theme based on page
  let defaultTheme = "light";
  const pathname = usePathname();
  if (pathname.startsWith("/case-studies")) {
    defaultTheme = "dark";
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}
