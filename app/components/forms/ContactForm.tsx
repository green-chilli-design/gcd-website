"use client";

import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendContact } from "../../actions";
import LoadingSpinner from "./LoadingSpinner";
import { useRouter } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="btn green mt-10 flex w-52 items-center justify-center text-black"
    >
      {pending && <LoadingSpinner />}
      {!pending && "Send us a message"}
    </button>
  );
}

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, formAction] = useFormState(sendContact, null);
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const onSubmit = async (formData: FormData) => {
    if (!executeRecaptcha) {
      console.log("Execute Recaptcha not yet available");
      return;
    }
    const token = await executeRecaptcha("contact");
    formData.set("g-recaptcha-response", token);
    formAction(formData);
  };

  if (state?.type === "success") {
    ref.current?.reset();
    router.push("/thank-you");
  }

  return (
    <form name="contact" className="flex flex-col" ref={ref} action={onSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <div className="mb-4">
        <label htmlFor="first-name" className="small text-dark-grey">
          First Name
        </label>
        <input
          id="first-name"
          name="first-name"
          className="h-14 w-full rounded-md border border-dark-grey bg-neutral p-2.5 dark:text-black"
          type="text"
        />
        {state?.errors?.firstName && (
          <span className="text-2xs text-rose-500">
            {state.errors.firstName.join(",")}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="last-name" className="small text-dark-grey">
          Last Name
        </label>
        <input
          id="last-name"
          name="last-name"
          className="h-14 w-full rounded-md border border-dark-grey bg-neutral p-2.5 dark:text-black"
          type="text"
        />
        {state?.errors?.lastName && (
          <span className="text-2xs text-rose-500">
            {state.errors.lastName.join(",")}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="small text-dark-grey">
          Email
        </label>
        <input
          id="email"
          name="email"
          className="h-14 w-full rounded-md border border-dark-grey bg-neutral p-2.5 dark:text-black"
          type="email"
        />
        {state?.errors?.email && (
          <span className="text-2xs text-rose-500">
            {state.errors.email.join(",")}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="small text-dark-grey">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          className="h-14 w-full rounded-md border border-dark-grey bg-neutral p-2.5 dark:text-black"
          type="phone"
        />
        {state?.errors?.phone && (
          <span className="text-2xs text-rose-500">
            {state.errors.phone.join(",")}
          </span>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="website" className="small text-dark-grey">
          Company Website (if any)
        </label>
        <input
          id="website"
          name="website"
          className="h-14 w-full rounded-md border border-dark-grey bg-neutral p-2.5 dark:text-black"
          type="text"
        />
        {state?.errors?.website && (
          <span className="text-2xs text-rose-500">
            {state.errors.website.join(",")}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="message" className="small text-dark-grey">
          Message
        </label>
        <textarea
          id="message"
          className="h-28 w-full rounded-md border border-dark-grey bg-neutral p-2.5 dark:text-black"
          name="message"
        />
      </div>

      <SubmitButton />

      {state?.type === "error" && state?.message && (
        <p className="mt-2 text-rose-500" aria-live="polite" role="status">
          {state?.message}
        </p>
      )}
    </form>
  );
}
