"use server";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";

export interface ActionResponse {
  type: "success" | "error";
  message?: string;
  errors?: { [key: string]: string[] | undefined };
}

const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  email: z.string().email(),
  phone: z.string(),
  website: z.string(),
  message: z.string(),
  gRecaptchaResponse: z.string(),
});

export async function sendContact(
  _: any,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    if (!formData) {
      return { type: "error", message: "Something went wrong :(" };
    }

    const data = contactFormSchema.parse({
      firstName: formData.get("first-name") ?? "",
      lastName: formData.get("last-name") ?? "",
      email: formData.get("email") ?? "",
      phone: formData.get("phone") ?? "",
      website: formData.get("website") ?? "",
      message: formData.get("message") ?? "",
      gRecaptchaResponse: formData.get("g-recaptcha-response") ?? "",
    });

    if (!data.gRecaptchaResponse) {
      throw new Error("There was no reCAPTCHA token in the request");
    }

    await validateRecaptcha(data.gRecaptchaResponse);

    await sendEmail(data);

    await sendSlackNotification(data);

    return { type: "success", message: "Message sent" };
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
      return { type: "error", errors: fieldErrors };
    }
    if (
      error instanceof Error &&
      error.message === "reCAPTCHA verification failed"
    ) {
      return {
        type: "error",
        message: error.message,
      };
    }
    return { type: "error", message: "Something went wrong :(" };
  }
}

async function validateRecaptcha(recaptchaResponse: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error("reCAPTCHA secret key not set");
  }
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?${new URLSearchParams({
      secret: encodeURIComponent(secretKey),
      response: encodeURIComponent(recaptchaResponse),
    }).toString()}`,
    {
      method: "POST",
      cache: "no-cache",
    },
  );

  const recaptchaResult = await response.json();
  if (
    !response.ok ||
    !recaptchaResult.success ||
    recaptchaResult.score <= 0.5
  ) {
    throw new Error("reCAPTCHA verification failed");
  }
}

async function sendEmail(
  data: z.infer<typeof contactFormSchema>,
): Promise<Response> {
  const smptp2goApiKey = process.env.SMTP2GO_API_KEY;
  if (!smptp2goApiKey) {
    throw new Error("SMTP2GO API key not set");
  }
  const response = await fetch(`https://api.smtp2go.com/v3/email/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: smptp2goApiKey,
      sender: ""
        .concat(data.firstName, " ")
        .concat(data.lastName, " <")
        .concat(data.email, ">"),
      to: ["Hello GCD <hello@gcd.nz>"],
      subject: `Contact Form Submission - ${data.firstName}, ${data.lastName}`,
      text_body: data.message,
      html_body: `
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Website:</strong> ${data.website}</p>
          <p><strong>Message:</strong> ${data.message}</p>
        `,
    }),
    cache: "no-cache",
  });

  if (!response.ok) {
    const body = await response.json();
    throw new Error(
      `Failed to send email: ${response.status} ${
        response.statusText
      }, ${JSON.stringify(body)}`,
    );
  }

  return response;
}

async function sendSlackNotification(
  data: z.infer<typeof contactFormSchema>,
): Promise<Response> {
  const slackUrl = process.env.SLACK_WEBHOOK_URL;

  if (!slackUrl) {
    throw new Error("Slack webhook URL not set");
  }

  const response = await fetch(slackUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: `New contact form submission from ${data.firstName} ${data.lastName} <${data.email}>`,
    }),
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(
      `Slack webhook failed. ${response.status} ${response.statusText}`,
    );
  }

  return response;
}

const subscribeFormSchema = z.object({
  email: z.string().email(),
  gRecaptchaResponse: z.string(),
});

// TODO: just a dummy function at the moment / disabled for MVP
export async function sendSubscribe(
  _: any,
  formData: FormData,
): Promise<ActionResponse> {
  try {
    if (!formData) {
      return { type: "error", message: "Something went wrong :(" };
    }

    const data = subscribeFormSchema.parse({
      email: formData.get("email") ?? "",
      gRecaptchaResponse: formData.get("g-recaptcha-response") ?? "",
    });

    if (!data.gRecaptchaResponse) {
      throw new Error("There was no reCAPTCHA token in the request");
    }

    await validateRecaptcha(data.gRecaptchaResponse);

    // TODO: implement this
    // await createSubscription(data.email);

    return { type: "success", message: "Subscribed!" };
  } catch (error) {
    console.log(error);
    Sentry.captureException(error);
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
      return { type: "error", errors: fieldErrors };
    }
    if (
      error instanceof Error &&
      error.message === "reCAPTCHA verification failed"
    ) {
      return {
        type: "error",
        message: error.message,
      };
    }
    return { type: "error", message: "Something went wrong :(" };
  }
}

// TODO: Replace with actual API call
async function createSubscription(email: string): Promise<Response> {
  const response = await fetch(`https://example.com`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token SECRET`,
    },
    body: JSON.stringify({
      email,
    }),
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(
      `Subscription creation failed. ${response.status} ${response.statusText}`,
    );
  }

  return response;
}
