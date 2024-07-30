import Image from "next/image";

// TODO: Migrate this to Contentful
function Timeline() {
  return (
    <div className="flex w-full flex-col justify-center gap-10   text-center">
      <h2>Our Our End-to-End Mobile App Development Service</h2>
      <h3 className=" uppercase text-dark-grey">GCD END - TO - END PROCESS</h3>
      <div id="overflow-wrapper" className="overflow-x-scroll">
        <div
          id="timeline-img-container"
          className="relative h-[400px] w-full min-w-[6000px]"
        >
          <Image src="/images/timeline.svg" alt="timeline" fill={true} />
        </div>
      </div>
      <div
        className="main-content flex flex-col justify-around gap-20 text-left md:mt-10 md:flex-row"
        id="3-cols"
      >
        <div className=" flex-1  md:w-1/3">
          <h2 className="uppercase">Strong Stakeholder Alignment</h2>
          <p>
            Your feedback is integrated throughout the design to clickable
            wireframes so everyone knows what they’re getting before development
            even starts.
          </p>
        </div>
        <div className=" flex-1  md:w-1/3">
          <h2 className="uppercase">User-Centered Design</h2>
          <p>
            User and stakeholder input guides design refinements at every stage,
            ensuring high levels of satisfaction.
          </p>
        </div>
        <div className=" flex-1  md:w-1/3">
          <h2 className="uppercase">Drastically Reduce Risk</h2>
          <p>
            Iterative feedback loops catch issues early, saving both time and
            money efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
