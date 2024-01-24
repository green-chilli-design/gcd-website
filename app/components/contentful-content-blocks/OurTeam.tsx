import { getAllPersons } from "@/lib/api";
import ContentBlock from "./ContentBlock";
import TeamGallery from "../TeamGallery";

export default async function OurTeam({ contentBlock }: { contentBlock: any }) {
  const gcdTeam = await getAllPersons(true);

  return (
    <section className="flex flex-col items-center">
      <ContentBlock contentBlock={contentBlock} />
      <TeamGallery gcdTeam={gcdTeam} />
    </section>
  );
}
