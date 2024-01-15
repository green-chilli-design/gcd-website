import { getAllPersons, getContentBlockByName } from "@/lib/api";
import { generateContentBlocks } from "@/lib/contentful-content-blocks";

interface TeamMember {
  firstName: string;
  lastName: string;
}

export default async function OurTeam() {
  const content = await getContentBlockByName("Our Team");
  const gcdTeam: TeamMember[] = await getAllPersons(true);

  let contentBlock = generateContentBlocks(content);

  return (
    <section>
      {contentBlock}

      {gcdTeam.map((teamMember) => (
        <div key={teamMember.firstName + teamMember.lastName}>
          {teamMember.firstName}
        </div>
      ))}
    </section>
  );
}
