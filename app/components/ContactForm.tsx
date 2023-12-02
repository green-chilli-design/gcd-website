"use client";

// @ts-ignore
import { useFormState } from "react-dom";
// @ts-ignore
import { useFormStatus } from "react-dom";

import { sendContact } from "../actions";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback, useRef } from "react";

const initialState = {
  message: null,
  type: null,
  errors: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="bg-green hover:bg-white border hover:border-green rounded-full w-32 h-16 mt-12"
    >
      Submit
    </button>
  );
}

export function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, formAction] = useFormState(sendContact, initialState);
  const ref = useRef<HTMLFormElement>(null);
  const onSubmit = async (formData: FormData) => {
    if (!executeRecaptcha) {
      console.log("Execute Recaptcha not yet available");
      return;
    }
    const token = await executeRecaptcha("contact");
    formData.set("g-recaptcha-response", token);
    ref.current?.reset();
    await formAction(formData);
  };

  return (
    <form
      name="contact"
      className="flex flex-col gap-5"
      ref={ref}
      action={onSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <div className="mb-5">
        <label htmlFor="first-name" className="small text-dark-grey">
          First Name
        </label>
        <input
          id="first-name"
          name="first-name"
          className="p-2.5 border border-dark-grey rounded-md w-full h-14"
          type="text"
        />
        {state?.errors?.firstName && (
          <span className="text-2xs text-rose-500">
            {state.errors.firstName.join(",")}
          </span>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="last-name" className="small text-dark-grey">
          Last Name
        </label>
        <input
          id="last-name"
          name="last-name"
          className="p-2.5 border border-dark-grey rounded-md w-full h-14"
          type="text"
        />
        {state?.errors?.lastName && (
          <span className="text-2xs text-rose-500">
            {state.errors.lastName.join(",")}
          </span>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="small text-dark-grey">
          Email
        </label>
        <input
          id="email"
          name="email"
          className="p-2.5 border border-dark-grey rounded-md w-full h-14"
          type="email"
        />
        {state?.errors?.email && (
          <span className="text-2xs text-rose-500">
            {state.errors.email.join(",")}
          </span>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="website" className="small text-dark-grey">
          Company Website (if any)
        </label>
        <input
          id="website"
          name="website"
          className="p-2.5 border border-dark-grey rounded-md w-full h-14"
          type="text"
        />
        {state?.errors?.website && (
          <span className="text-2xs text-rose-500">
            {state.errors.website.join(",")}
          </span>
        )}
      </div>
      <div className="mb-5">
        <label htmlFor="message" className="small text-dark-grey">
          Message
        </label>
        <textarea
          id="message"
          className="p-2.5 border border-dark-grey rounded-md w-full h-28"
          name="message"
        />
      </div>

      {/* <div id="recaptcha-badge"></div> */}

      <SubmitButton />

      {state?.type === "success" && (
        <p
          className="text-2xs text-green mt-2"
          aria-live="polite"
          role="status"
        >
          {state?.message}
        </p>
      )}
      {state?.type === "error" && state?.message && (
        <p
          className="text-2xs text-rose-500 mt-2"
          aria-live="polite"
          role="status"
        >
          {state?.message}
        </p>
      )}
    </form>
  );
}
