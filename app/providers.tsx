"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export function Providers({ children }: { children: React.ReactNode }) {
  const recaptchaPublicKey = process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY ?? "";

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaPublicKey}
      container={{
        element: "recaptcha-badge",
        parameters: {},
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
