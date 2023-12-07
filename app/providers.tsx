"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const recaptchaPublicKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  // set theme based on page
  let defaultTheme = "light";
  const pathname = usePathname();
  if (pathname.startsWith("/case-studies")) {
    defaultTheme = "dark";
  }

  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={recaptchaPublicKey}
        scriptProps={{ async: true, defer: true }}
        // container={{
        //   element: "recaptcha-badge",
        //   parameters: {},
        // }}
      >
        {children}
      </GoogleReCaptchaProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme={defaultTheme}
        enableSystem={false}
      >
        {children}
      </ThemeProvider>
    </>
  );
}
