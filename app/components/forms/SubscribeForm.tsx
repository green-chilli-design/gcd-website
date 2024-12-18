"use client";

import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendSubscribe } from "../../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="btn green w-32"
    >
      {pending && (
        <span className="material-icons-outlined icon-24 m-2.5 animate-spin">
          progress_activity
        </span>
      )}
      {!pending && "Subscribe"}
    </button>
  );
}

export default function SubscribeForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [state, formAction] = useFormState(sendSubscribe, null);
  const ref = useRef<HTMLFormElement>(null);
  const onSubmit = async (formData: FormData) => {
    if (!executeRecaptcha) {
      console.log("Execute Recaptcha not yet available");
      return;
    }
    const token = await executeRecaptcha("subscribe");
    formData.set("g-recaptcha-response", token);
    formAction(formData);
  };

  if (state?.type === "success") {
    ref.current?.reset();
  }

  return (
    <form
      name="subscribe"
      className="flex flex-col"
      ref={ref}
      action={onSubmit}
    >
      <input type="hidden" name="form-name" value="subscribe" />

      <div className="flex flex-row">
        <div className="mr-5">
          {" "}
          <input
            id="email"
            name="email"
            className="h-14 w-full rounded-md border border-dark-grey p-2.5 dark:text-black"
            type="email"
            placeholder="Email address"
          />
          {state?.errors?.email && (
            <span className="text-2xs text-rose-500">
              {state.errors.email.join(",")}
            </span>
          )}
        </div>

        {/* <div id="recaptcha-badge"></div> */}

        <SubmitButton />
      </div>
      {state?.type === "success" && (
        <p
          className="mt-2 text-2xs text-green"
          aria-live="polite"
          role="status"
        >
          {state?.message}
        </p>
      )}
      {state?.type === "error" && state?.message && (
        <p
          className="mt-2 text-2xs text-rose-500"
          aria-live="polite"
          role="status"
        >
          {state?.message}
        </p>
      )}
    </form>
  );
}
