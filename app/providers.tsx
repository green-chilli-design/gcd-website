"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  const recaptchaPublicKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

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
        themes={["light", "dark"]}
        enableSystem={false}
      >
        {children}
      </ThemeProvider>
    </>
  );
}
