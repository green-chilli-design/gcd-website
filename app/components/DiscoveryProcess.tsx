import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DiscoveryProcess() {
  const processSteps = [
    {
      title: "01. Requirements gathering",
      description:
        "We'll work with you to understand your business needs and goals for the project. This will include an analysis of your target audience, competitors, and industry and mobile trends for inspiration and best practice.",
    },
    {
      title: "02. User flow & process logic",
      description:
        "Based on the information gathered in the previous step, we'll create a user flow and process logic that outlines the steps users will take to achieve their goals within the app..",
    },
    {
      title: "03. UX workshops with internal stakeholders",
      description:
        "We'll conduct workshops with your internal stakeholders to gather more information about your users' needs and how they interact with your products or services.",
    },
    {
      title: "04. Wireframes gradually evolving to hi-res prototype(s)",
      description:
        "Ahead of UX workshops we'll create wireframes and later hi-res prototypes of the app, which will be used to test the content and usability of each page together with the user flow and process logic.",
    },
    {
      title: "05. Customer workshops",
      description:
        "Depending on the project, we may conduct customer workshops to gather feedback on the wireframes and prototype as we did in stages 3 & 4 with stakeholders.",
    },
    {
      title: "06. Technical specifications",
      description:
        "Through stages 1 - 5 we'll create a technical specification document that outlines the technical requirements for the project, including the technology stack, any third-party integrations that will be required and key functionality.",
    },
    {
      title: "07. Final design",
      description:
        "Once the hi-res prototypes have been workshopped and approved we'll work with you to finalise the design of the app, including the user interface and overall look and feel.",
    },
    {
      title: "08. Project costs and timeline",
      description:
        "After completing stages 1-6, we'll provide a detailed project cost and timeline estimate, incorporating necessary contingencies. The GC Digital Discovery Process is a flexible and collaborative approach to understanding your business and user requirements, ensuring stakeholder alignment before building the solution.",
    },
  ];

  return (
    <div className="mb-[120px] mt-20">
      <section className="main-content flex flex-wrap gap-20 lg:flex-nowrap">
        <div className="mb-10 basis-full lg:basis-2/5">
          <h2 className="mb-5">Discovery process outline</h2>
          <h4>
            The GC Digital Discovery Process ensures a thorough understanding of
            your business and user needs, creating a tailored solution.
            Stakeholders are involved to grasp requirements before building,
            with flexibility to adapt to your project's specific needs.
          </h4>
        </div>

        <div className="basis-full lg:basis-3/5">
          {processSteps.map((step, index) => {
            return (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value={index.toString()}>
                  <AccordionTrigger className="text-left text-base font-medium uppercase">
                    {step.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {step.description}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
      </section>
    </div>
  );
}
