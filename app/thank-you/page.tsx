import Link from "next/link";
import GCDLogo from "../components/GCDLogo";

export default async function ThankYouPage() {
  return (
    <div className="main-content m-auto flex justify-center">
      <div className="items-start justify-between lg:flex">
        <GCDLogo
          className={
            "mb-10 me-24 h-20 w-20 transition duration-500 hover:scale-110 lg:mb-0 lg:h-48 lg:w-48"
          }
        />
        <div>
          <section className="mb-16 max-w-lg">
            <h2 className="mb-5 text-6xl lg:text-10xl">
              Thank You for
              <br />
              Reaching Out!
            </h2>
            <p>We received your message and will get back to you shortly.</p>
          </section>
          <div className={"max-w-lg justify-between lg:flex"}>
            <Link
              href={"/"}
              className="btn lg:green mb-5 flex w-52 items-center justify-center border border-green text-green lg:mb-0 lg:text-black"
            >
              Back to Home Page
            </Link>
            <Link
              href={"https://www.linkedin.com/company/green-chilli-digital/"}
              target={"_blank"}
              className="btn flex w-56 items-center justify-center border border-black text-black dark:border-white dark:text-white"
            >
              Follow Us on LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
