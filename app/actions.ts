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

    await sendEmailToLead(data);
    await addNewLead(data);

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

async function sendEmailToGcd(lead: Contact) {
  const subject = `Contact Form Submission - ${lead.firstName}, ${lead.lastName}`;
  const html = `
    <p><strong>Name:</strong> ${lead.firstName} ${lead.lastName}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Phone:</strong> ${lead?.phone}</p>
    <p><strong>Website:</strong> ${lead?.website}</p>
    <p><strong>Message:</strong> ${lead?.message}</p>
  `;

  return await sendEmail(
    GCD_LEADS,
    GCD_CONTACT,
    subject,
    lead.message,
    html,
    lead,
  );
}

async function sendEmailToLead(lead: Contact) {
  const subject = "Thank You for Contacting GCD.";
  const html = `
    <p>Dear ${lead.firstName},</p>
    <p>Thank you for reaching out to us via our website contact form. We have received your message and appreciate you taking the time to get in touch.</p>
    <p>Our team will review your inquiry and respond to you as soon as possible. In the meantime, if you have any additional information or questions, please feel free to reply to this email.</p>
    <p>Thank you again for contacting us. We look forward to assisting you!</p>
    <p>Best regards,<br>GCD</p>
  `;

  return await sendEmail(GCD_CONTACT, lead, subject, undefined, html);
}

function composeEmailAddress(details: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  return `${details.firstName} ${details.lastName} <${details.email}>` as const;
}

/**
 *
 * @param from Sender of the email. Defaults to `hello@gcd.nz`.❗Warning: Only set to email on gcd.nz address to avoid spoofing.
 * @param to Recipient of the email
 * @param subject Subject line
 * @param textBody Plain text body
 * @param htmlBody HTML formatted body
 * @param sender The actual sender of the email.
 *
 * @returns smtp2go response
 */
async function sendEmail(
  from: Contact,
  to: Contact,
  subject: string,
  textBody?: string,
  htmlBody?: string,
  replyTo?: Contact,
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
      sender: composeEmailAddress(from),
      to: [composeEmailAddress(to)],
      subject,
      text_body: textBody,
      html_body: htmlBody,
      custom_headers: replyTo
        ? [
            {
              header: "Reply-To",
              value: composeEmailAddress(replyTo),
            },
          ]
        : [],
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

const ADD_CLIENT_MUTATION = `
mutation createItem($name: String!, $columnValues: JSON!) {
  create_item(
    board_id: 7002702691
    item_name: $name
    column_values: $columnValues
  ) {
    id
  }
}
`;

async function addNewLead(contact: Contact) {
  if (!process.env.MONDAY_API_TOKEN) {
    throw new Error("Please provide MONDAY_API_TOKEN in your environment.");
  }

  const columnValues = {
    status: "New Lead",
    // Monday requires this formatting for type email
    // The second string determines the value that is visible to us in Monday.com and can't be left empty
    email: `${contact.email} ${contact.email}`,
    text8: contact.website || "",
    phone: contact.phone || "",
  };

  const variables = {
    name: `${contact.firstName} ${contact.lastName}`,
    columnValues: JSON.stringify(columnValues),
  };

  console.log(variables);

  const response = await fetch(new URL("https://api.monday.com/v2/"), {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.MONDAY_API_TOKEN,
      "API-Version": "2023-10",
    },
    body: JSON.stringify({ query: ADD_CLIENT_MUTATION, variables }),
  });

  if (!response.ok) {
    Sentry.captureMessage(
      `Error adding new lead to Monday: ${response.status} ${response.statusText}`,
      "error",
    );
  }
}
