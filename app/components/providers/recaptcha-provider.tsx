"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function RecaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const recaptchaPublicKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
  if (!recaptchaPublicKey) {
    throw new Error("Recaptcha public key not found");
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaPublicKey}
      scriptProps={{ async: true, defer: true }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
