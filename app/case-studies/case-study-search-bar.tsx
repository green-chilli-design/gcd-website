"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SubCategoryItem } from "../components/contentful-content-blocks/ServicesSection";
import { useCallback } from "react";

export default function CaseStudySearchBar({
  categories,
}: {
  categories: SubCategoryItem[];
}) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  function selectCategory(category: string) {
    if (category !== "All") {
      router.push(pathname + "?" + createQueryString("category", category));
    } else {
      // TODO: this shouldn't remove other search params
      // Should just delete the category param?
      router.push(pathname);
    }
  }

  return (
    <section className="main-content my-10">
      <div className="mb-5 flex flex-col gap-2">
        <label>Category:</label>
        <div className="nowrap flex items-center gap-5 md:max-w-[300px]">
          <Select onValueChange={(value) => selectCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder={category ? category : "All"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"All"}>All</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
