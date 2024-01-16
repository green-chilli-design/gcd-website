import { getAllPersons } from "@/lib/api";
import ContentBlock from "./ContentBlock";
import TeamGallery from "../TeamGallery";

export default async function OurTeam({ contentBlock }: { contentBlock: any }) {
  const gcdTeam = await getAllPersons(true);

  return (
    <section>
      <ContentBlock contentBlock={contentBlock} />
      <TeamGallery gcdTeam={gcdTeam} />
    </section>
  );
}
