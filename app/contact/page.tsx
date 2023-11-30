import { getPageBySlug } from "@/lib/api";
import React from "react";
import { ContactForm } from "../components/ContactForm";

export default async function ContactPage() {
  const { subtitle, description } = await getPageBySlug("contact");

  return (
    <div>
      <div className="container">
        <section className="mb-24">
          <h2 className="mb-5">{subtitle}</h2>
          <p className="max-w-2xl">{description}</p>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 mb-11">
          <div className="mr-12 mb-12">
            <h5 className="font-semibold mb-5">Auckland, New Zealand</h5>
            <p className="small flex items-center mb-5">
              <span className="material-symbols-outlined icon-20 mr-2">
                location_on
              </span>
              <a
                href="https://maps.app.goo.gl/52MW8aJLZVwuGmQ47"
                className="hover:text-green"
              >
                2.4 Whatever Building, 18 Sale Street, Auckland 1010
              </a>
            </p>
            <p className="small flex items-center mb-5">
              <span className="material-symbols-outlined icon-20 mr-2">
                call
              </span>
              <a href="tel:+64 09 300 3039" className="hover:text-green">
                +64 09 300 3039
              </a>
            </p>
            <p className="small flex items-center mb-12">
              <span className="material-symbols-outlined icon-20 mr-2 ">
                email
              </span>
              <a href="mailto:hello@gcd.nz" className="hover:text-green">
                hello@gcd.nz
              </a>
            </p>

            <p>Our opening hours are Monday - Friday 8:30am - 5:30pm.</p>
          </div>

          <ContactForm />
        </section>
      </div>

      <div>
        <p className="small uppercase flex items-center mb-2.5 px-5 cursor-pointer">
          <span className="material-symbols-outlined icon-24 mr-2">
            visibility
          </span>
          View Parking Instructions
        </p>

        <div className="bg-[url('/images/map.png')] bg-cover bg-center h-96"></div>
      </div>
    </div>
  );
}
