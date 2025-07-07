"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategory } from "@/store/slices/filterSlice";
import { useGetAllCategoriesQuery } from "@/store/services/woocommerceApi";
import { Skeleton } from "@/components/ui/skeleton";

type Category = {
  id: number;
  name: string;
  parent: number;
};

export default function CategoryFilter() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.filter.categoryId);
  const { data: categories, isLoading } = useGetAllCategoriesQuery();

  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-3/4 rounded bg-gray-200" />
        ))}
      </div>
    );
  }

  if (!categories) return null;

  const parents = categories.filter((cat: Category) => cat.parent === 0);
  const childrenMap: Record<number, Category[]> = {};

  categories.forEach((cat: Category) => {
    if (cat.parent !== 0) {
      if (!childrenMap[cat.parent]) {
        childrenMap[cat.parent] = [];
      }
      childrenMap[cat.parent].push(cat);
    }
  });

  return (
    <div className="space-y-2 p-4">
      <button
        onClick={() => dispatch(setCategory(null))}
        className={`block text-left px-3 py-1 rounded-md ${
          selected === null ? "bg-primary text-white" : "hover:bg-gray-100"
        }`}
      >
        All Products
      </button>

      {parents.map((parent: Category) => (
        <div key={parent.id}>
          <button
            onClick={() => dispatch(setCategory(parent.id))}
            className={`block text-left px-3 py-1 rounded-md w-full ${
              selected === parent.id
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {parent.name}
          </button>

          {/* Subcategories */}
          {childrenMap[parent.id]?.map((sub: Category) => (
            <button
              key={sub.id}
              onClick={() => dispatch(setCategory(sub.id))}
              className={`block text-left px-6 py-1 rounded-md text-sm w-full ${
                selected === sub.id
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              └ {sub.name}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
