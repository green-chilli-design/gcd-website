import LocationMap from "@/app/components/LocationMap";
import ParkingModal from "@/app/components/ParkingModal";
import ContactForm from "@/app/components/forms/ContactForm";
import RecaptchaProvider from "@/app/components/providers/recaptcha-provider";
import { getAssetByTitle, getPageBySlug } from "@/lib/api";
import type { Metadata } from "next";
import { draftMode } from "next/headers";

const title = "Contact GCD for your next digital project";
export const metadata: Metadata = {
  title,
  description:
    "GCD Auckland Custom web software and mobile app developers. Talk to one of our digital consultants about your digital projects now.",
  openGraph: {
    title,
  },
  twitter: {
    title,
  },
};

export default async function ContactPage() {
  const { isEnabled } = draftMode();
  const { subtitle, description } = await getPageBySlug("contact", isEnabled);
  const parkingMap = await getAssetByTitle("Parking Map");

  return (
    <RecaptchaProvider>
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
                <span className="material-icons-outlined icon-20 mr-2">
                  location_on
                </span>
                <a
                  href="https://maps.app.goo.gl/52MW8aJLZVwuGmQ47"
                  className="hover:text-green"
                >
                 57L Livingstone Street, Westmere, Auckland 1022
                </a>
              </p>
              <p className="small mb-12 flex items-center">
                <span className="material-icons-outlined icon-20 mr-2">
                  call
                </span>
                <a href="tel:‭+64 9 887 3205‬" className="hover:text-green">
                  +64 9 887 3205
                </a>
              </p>

              <p>Our business hours are Monday - Friday 8:30am - 5:30pm.</p>
            </div>

            <ContactForm />
          </section>
          
        </div>

        <LocationMap />
      </div>
    </RecaptchaProvider>
  );
}
