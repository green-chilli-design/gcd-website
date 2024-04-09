import { getAssetByTitle, getPageBySlug } from "@/lib/api";
import React from "react";
import ContactForm from "@/app/components/forms/ContactForm";
import ParkingModal from "@/app/components/ParkingModal";
import LocationMap from "@/app/components/LocationMap";
import type { Metadata } from "next";

const title = "GCD | Contact Us";
export const metadata: Metadata = {
  title,
  openGraph: {
    title,
  },
  twitter: {
    title,
  },
};

export default async function ContactPage() {
  const { subtitle, description } = await getPageBySlug("contact");
  const parkingMap = await getAssetByTitle("Parking Map");

  return (
    <div>
      <div className="main-content mt-24 lg:mt-28">
        <section className="mb-24">
          <h2 className="mb-5">{subtitle}</h2>
          <p className="max-w-2xl">{description}</p>
        </section>

        <section className="mb-11 grid grid-cols-1 lg:grid-cols-2">
          <div className="mb-12 mr-12">
            <h5 className="mb-5 font-semibold">Auckland, New Zealand</h5>
            <p className="small mb-5 flex items-center">
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
            <p className="small mb-12 flex items-center">
              <span className="material-symbols-outlined icon-20 mr-2">
                call
              </span>
              <a href="tel:+64 09 300 3039" className="hover:text-green">
                +64 09 300 3039
              </a>
            </p>

            <p>Our business hours are Monday - Friday 8:30am - 5:30pm.</p>
          </div>

          <ContactForm />
        </section>

        <ParkingModal
          url={parkingMap.url}
          description={parkingMap.description}
          width={parkingMap.width}
          height={parkingMap.height}
        />
      </div>

      <LocationMap />
    </div>
  );
}
