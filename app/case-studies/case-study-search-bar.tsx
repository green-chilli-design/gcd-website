"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SubCategoryItem } from "../types/contentful-types";

export default function CaseStudySearchBar({
  categories,
}: {
  categories: SubCategoryItem[];
}) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
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
    <section>
      {/* desktop filter */}
      <div className="hidden w-full flex-wrap items-center gap-6 border border-x-0 border-y-black py-5 dark:border-y-neutral md:flex lg:justify-between">
        <button
          type="button"
          onClick={() => selectCategory("All")}
          className={`text-sm uppercase hover:text-green ${
            selectedCategory === "All" || !selectedCategory
              ? "text-green"
              : "text-black dark:text-neutral"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            type="button"
            onClick={() => selectCategory(category.name)}
            className={`text-sm uppercase hover:text-green ${
              selectedCategory === category.name
                ? "text-green"
                : "text-black dark:text-neutral"
            }`}
            key={category.name}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* mobile filter */}
      <div className="flex items-center gap-5 md:hidden">
        <Select onValueChange={(value) => selectCategory(value)}>
          <SelectTrigger>
            <SelectValue
              placeholder={selectedCategory ? selectedCategory : "All"}
            />
          </SelectTrigger>
          <SelectContent>
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
