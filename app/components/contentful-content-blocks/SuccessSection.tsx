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

      <div className="main-content mb-20 flex w-full flex-wrap items-center justify-center gap-5">
        {caseStudyCategory?.subCategoriesCollection?.items.map(
          (category: any) =>
            category.coverImage && (
              <Card
                title={category.name}
                image={category.coverImage.url}
                link={`/case-studies?category=${category.name}`}
              />
            ),
        )}
      </div>
    </section>
  );
}
