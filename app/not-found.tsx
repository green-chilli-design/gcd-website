import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-5">
      <section className="flex-row flex items-center justify-center my-16 md:my-12">
        <h2 className="text-xl md:text-5xl font-bold tracking-tighter leading-tight pr-8 border-e-2 border-gcd-green mr-8">
          404
        </h2>
        <p>This page could not be found.</p>
      </section>
    </div>
  );
}
