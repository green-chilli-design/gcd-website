import { getCategoryByName } from "@/lib/api";
import ContentBlock from "./ContentBlock";
import Card from "../Card";

export default async function SuccessSection({
  contentBlock,
}: {
  contentBlock: any;
}) {
  const caseStudyCategory = await getCategoryByName("Case Studies");

  return (
    <section>
      <ContentBlock contentBlock={contentBlock} />

      <div className="main-content mb-[200px] flex w-full flex-wrap items-center justify-center gap-5">
        {caseStudyCategory?.subCategoriesCollection?.items.map(
          (category: any) =>
            category.coverImage && (
              <Card
                key={category.name}
                title={category.name}
                image={category.coverImage.url}
                link={`/case-studies?category=${category.name}`}
              />
            ),
        )}
      </div>

      <div className="main-content mb-[200px] grid grid-cols-1 justify-items-center gap-20 md:grid-cols-3">
        <div className="flex w-full flex-col items-center justify-between text-center md:items-start md:text-left">
          <div>
            <h3 className="mb-5">
              A decade working alongside Milford Asset Management
            </h3>
            <p>
              It&apos;s a privilege to be part of Milford&apos;s 10 years of
              growth from under $2 billion to more than $15 billion of client
              funds under management.
            </p>
          </div>
          <div>
            <div className="mt-16 flex w-full flex-wrap items-center gap-4">
              <h1>$15</h1>
              <h2 className="text-nowrap uppercase">Billion +</h2>
            </div>
            <h4>in client funds under management</h4>
          </div>
        </div>
        <div className="flex max-w-[374px] flex-col items-center justify-between text-center md:items-start md:text-left">
          <div>
            <h3 className="mb-5">New Digital Advice Tool</h3>
            <p>
              As FMA rules allowed for online digital advice we designed and
              developed Milford Asset Management&apos;s highly rated KiwiSaver
              advice tool.
            </p>
          </div>
          <div>
            <div className="mt-16">
              <h1>94%</h1>
            </div>
            <h4>ease of use as rated by customers</h4>
          </div>
        </div>
        <div className="flex max-w-[374px] flex-col items-center justify-between text-center md:items-start md:text-left">
          <div>
            <h3 className="mb-5">
              Halving acquisition costs for Pinnacle Life
            </h3>
            <p>
              In 10 months, we slashed acquisition costs for Pinnacle Life in
              the competitive NZ life insurance market. Our strategic digital
              advertising and HubSpot email workflows efficiently attracted and
              converted customers, providing a swift and cost-effective
              solution.
            </p>
          </div>
          <div>
            <div className="mt-16">
              <h1>-42%</h1>
            </div>
            <h4>customer acquisition costs</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
