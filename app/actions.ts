"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name can't be empty" }),
  lastName: z.string().min(1, { message: "Last name can't be empty" }),
  email: z.string().email({ message: "Invalid email address" }),
  website: z.string(),
  message: z.string(),
});

export async function sendContact(
  prevState: any,
  formData: FormData,
  recaptchaResponse: string
) {
  "use server";
  try {
    console.log(formData);
    console.log(recaptchaResponse);

    const data = contactFormSchema.parse({
      firstName: formData.get("first-name") ?? "",
      lastName: formData.get("last-name") ?? "",
      email: formData.get("email") ?? "",
      website: formData.get("website") ?? "",
      message: formData.get("message") ?? "",
    });

    // if (recaptchaResponse) {
    //   await validateRecaptcha(recaptchaResponse);
    // } else {
    //   throw new Error("reCAPTCHA verification failed");
    // }

    await sendEmail(data);
    await sendSlackNotification(data);
    revalidatePath("/");
    return { type: "success" as const, message: "Message sent" };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
      return { type: "error" as const, errors: fieldErrors };
    }
    return { type: "error" as const, message: "Something went wrong :(" };
  }
}

async function validateRecaptcha(recaptchaResponse: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error("reCAPTCHA secret key not set");
  }
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(
      secretKey
    )}&response=${encodeURIComponent(recaptchaResponse)}`,
    {
      method: "POST",
      cache: "no-cache",
    }
  );
  if (!response.ok) {
    throw new Error("reCAPTCHA verification failed");
  }
  const recaptcha = await response.json();
  if (!recaptcha.success || recaptcha.score <= 0.5) {
    throw new Error("reCAPTCHA verification failed");
  }
  return recaptcha;
}

async function sendEmail(data: any): Promise<Response> {
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
          <p><strong>Website:</strong> ${data.website}</p>
          <p><strong>Message:</strong> ${data.message}</p>
        `,
    }),
    cache: "no-cache",
  });

  if (!response.ok) {
    console.log(response);
    const body = await response.json();
    console.log(body);
    throw new Error("Email sending failed");
  }

  return response;
}

async function sendSlackNotification(data: any): Promise<Response> {
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
    throw new Error("Slack webhook failed");
  }

  return response;
}
