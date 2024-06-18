"use server";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";

export interface ActionResponse {
  type: "success" | "error";
  message?: string;
  errors?: { [key: string]: string[] | undefined };
}

export type Contact = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  website?: string;
  message?: string;
};

const GCD_CONTACT = {
  firstName: "Hello",
  lastName: "GCD",
  email: "hello@gcd.nz",
} as const satisfies Contact;

const GCD_LEADS = {
  firstName: "New",
  lastName: "Lead",
  email: "leads@gcd.nz",
} as const satisfies Contact;

const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().optional(),
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
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      website: formData.get("website"),
      message: formData.get("message"),
      gRecaptchaResponse: formData.get("g-recaptcha-response"),
    });

    if (!data.gRecaptchaResponse) {
      throw new Error("There was no reCAPTCHA token in the request");
    }

    await validateRecaptcha(data.gRecaptchaResponse);

    await sendEmailToGcd(data);
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

async function sendEmailToGcd(from: Contact) {
  const subject = `Contact Form Submission - ${from.firstName}, ${from.lastName}`;
  const html = `
    <p><strong>Name:</strong> ${from.firstName} ${from.lastName}</p>
    <p><strong>Email:</strong> ${from.email}</p>
    <p><strong>Phone:</strong> ${from?.phone}</p>
    <p><strong>Website:</strong> ${from?.website}</p>
    <p><strong>Message:</strong> ${from?.message}</p>
  `;

  return await sendEmail(from, GCD_CONTACT, subject, from.message, html);
}

function formatEmail(details: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  return `${details.firstName} ${details.lastName} <${details.email}>` as const;
}

/**
 *
 * @param from Sender of the email. `Reply-To` header will be set from this contact
 * @param to Recipient of the email
 * @param subject Subject line
 * @param textBody Plain text body
 * @param htmlBody HTML formatted body
 * @param sender The actual sender of the email.  Defaults to `leads@gcd.nz`.❗Warning: Only set to email on gcd.nz address to avoid spoofing.
 *
 * @returns smtp2go response
 */
async function sendEmail(
  from: Contact,
  to: Contact,
  subject: string,
  textBody?: string,
  htmlBody?: string,
  sender: Contact = GCD_LEADS,
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
      sender: formatEmail({
        firstName: "New",
        lastName: "Lead",
        email: "leads@gcd.nz",
      }),
      to: [formatEmail(to)],
      subject,
      text_body: textBody,
      html_body: htmlBody,
      custom_headers: [
        {
          header: "Reply-To",
          value: formatEmail(from),
        },
      ],
    }),
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to send email: ${response.status} ${response.statusText}`,
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
