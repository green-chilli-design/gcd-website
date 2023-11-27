import { NextRequest, NextResponse } from "next/server";

/** Handles the contact form submission, including the reCAPTCHA verification */
export async function POST(request: NextRequest) {
  const { body } = request;
  const { "g-recaptcha-response": recaptchaResponse } = body;

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return NextResponse.json(
      { message: "reCAPTCHA secret key is not set" },
      { status: 500 }
    );
  }

  // Verify the reCAPTCHA response
  const recaptchaVerification = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(
      secretKey
    )}&response=${encodeURIComponent(recaptchaResponse)}`,
    {
      method: "POST",
    }
  ).then((response) => response.json());

  if (!recaptchaVerification.success) {
    return NextResponse.json(
      { message: "reCAPTCHA verification failed" },
      { status: 400 }
    );
  }
}
