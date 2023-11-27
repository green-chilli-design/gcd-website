import { getPageBySlug } from "@/lib/api";
import React from "react";

export default async function ContactPage() {
  const { subtitle, description } = await getPageBySlug("contact");

  return (
    <div>
      <div className="container mx-auto px-5">
        <section className="mb-24">
          <h2 className="mb-5">{subtitle}</h2>
          <p className="max-w-2xl">{description}</p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 mb-11">
          <div className="mr-12 mb-12">
            <h5 className="font-semibold mb-5">Auckland, New Zealand</h5>
            <p className="small flex mb-5">
              <img
                className="inline-block mr-2"
                src="/icons/location_on.svg"
                alt="location icon"
              />
              2.4 Whatever Building, 18 Sale Street, Auckland 1010
            </p>
            <p className="small flex mb-5">
              <img
                className="inline-block mr-2"
                src="/icons/call.svg"
                alt="call icon"
              />
              +64 09 300 3039
            </p>
            <p className="small flex mb-12">
              <img
                className="inline-block mr-2"
                src="/icons/mail.svg"
                alt="email icon"
              />
              hello@gcd.nz
            </p>

            <p>Our opening hours are Monday - Friday 8:30am - 5:30pm.</p>
          </div>

          <form name="contact" className="flex flex-col gap-5">
            <input type="hidden" name="form-name" value="contact" />
            <div className="mb-5">
              <label htmlFor="first-name" className="small text-dark-grey">
                First Name
              </label>
              <input
                id="first-name"
                className="p-2.5 border border-dark-grey rounded-md w-full h-full"
                type="text"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="last-name" className="small text-dark-grey">
                Last Name
              </label>
              <input
                id="last-name"
                className="p-2.5 border border-dark-grey rounded-md w-full h-full"
                type="text"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="small text-dark-grey">
                Email
              </label>
              <input
                id="email"
                className="p-2.5 border border-dark-grey rounded-md w-full h-full"
                type="email"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="website" className="small text-dark-grey">
                Company Website (if any)
              </label>
              <input
                id="website"
                className="p-2.5 border border-dark-grey rounded-md w-full h-full"
                type="text"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="small text-dark-grey">
                Message
              </label>
              <textarea
                id="message"
                className="p-2.5 border border-dark-grey rounded-md w-full h-full"
                name="message"
              />
            </div>
            {/* <div>TODO: Recaptcha</div> */}

            <button
              type="submit"
              className="bg-green hover:bg-neutral border hover:border-green rounded-full w-32 h-16 mt-12"
            >
              Submit
            </button>
          </form>
        </section>
      </div>

      <div>
        <p className="small uppercase flex mb-2.5 px-5">
          <img
            className="inline-block mr-2"
            src="/icons/visibility.svg"
            alt="eye icon"
          />
          View Parking Instructions
        </p>

        <div className="bg-[url('/images/map.png')] bg-cover bg-center"></div>
      </div>
    </div>
  );
}
