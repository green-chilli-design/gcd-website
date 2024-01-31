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
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
        return params.toString();
      } else {
        params.delete(name);
        return params.toString();
      }
    },
    [searchParams],
  );

  function selectCategory(category: string) {
    if (category !== "All") {
      router.push(pathname + "?" + createQueryString("category", category));
    } else {
      const queryString = createQueryString("category", null);
      if (queryString === "") {
        router.push(pathname);
      } else {
        router.push(pathname + "?" + queryString);
      }
    }
  }

  return (
    <section className="flex flex-col gap-2">
      <label>Category:</label>
      <div className="nowrap flex items-center gap-5 md:max-w-[300px]">
        <Select onValueChange={(value) => selectCategory(value)}>
          <SelectTrigger className="text-black">
            <SelectValue placeholder={category ? category : "All"} />
          </SelectTrigger>
          <SelectContent className="text-black">
            <SelectItem value="All">All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
