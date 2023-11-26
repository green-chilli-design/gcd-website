import { getPageBySlug } from "@/lib/api";
import React from "react";

export default async function ContactPage() {
  const { subtitle, description } = await getPageBySlug("contact");

  return (
    <div>
      <h2>{subtitle}</h2>
      <p>{description}</p>
    </div>
  );
}
