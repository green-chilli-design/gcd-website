import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionMultipleProps } from "@radix-ui/react-accordion";

export default function DiscoveryProcess() {
  // TODO: add content
  const processSteps = [
    {
      title: "01. Requirements gathering",
      description:
        "We'll work with you to understand your business needs and goals for the project. This will include an analysis of your target audience, competitors, and industry and mobile trends for inspiration and best practice.",
    },
    {
      title: "02. User flow & process logic",
      description: "TO DO.",
    },
    {
      title: "03. UX workshops with internal stakeholders",
      description: "TO DO.",
    },
    {
      title: "04. Wireframes gradually evolving to hi-res prototype(s)",
      description: "TO DO.",
    },
    {
      title: "05. Customer workshops",
      description: "TO DO.",
    },
    {
      title: "06. Technical specifications",
      description: "TO DO.",
    },
    {
      title: "07. Final design",
      description: "TO DO.",
    },
    {
      title: "08. Project costs and timeline",
      description: "TO DO.",
    },
  ];

  return (
    <div className="mb-[120px] mt-20">
      <section className="main-content flex flex-wrap gap-20">
        <div className="mb-10 max-w-[522px] flex-initial">
          <h2 className="mb-5">Discovery process outline</h2>
          <p className="text-xl">
            The GC Digital Discovery Process ensures a thorough understanding of
            your business and user needs, creating a tailored solution.
            Stakeholders are involved to grasp requirements before building,
            with flexibility to adapt to your project's specific needs.
          </p>
        </div>

        <div className="grow">
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
