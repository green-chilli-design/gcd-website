export interface Category {
  name: string;
  subCategoriesCollection: {
    items: SubCategoryItem[];
  };
}

export interface SubCategoryItem {
  name: string;
  description: string;
  coverImage: {
    url: string;
  };
}
