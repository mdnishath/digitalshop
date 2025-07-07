"use client";

import { useAppSelector } from "@/store/hooks";
import { useGetAllProductsQuery } from "@/store/services/woocommerceApi";
import ProductCard from "./ProductCard";
import ProductGridSkeleton from "./ProductCardSkeleton";

export default function ProductGrid() {
  const selected = useAppSelector((state) => state.filter.categoryId);
  const search = useAppSelector((state) =>
    state.filter.searchTerm.toLowerCase()
  );
  const { data, isLoading, error } = useGetAllProductsQuery();

  if (isLoading) return <ProductGridSkeleton />;
  if (error) return <p className="text-red-500 p-4">Error loading products</p>;

  const filtered = data?.filter((p: any) => {
    const inCategory =
      !selected || p.categories.some((cat: any) => cat.id === selected);
    const matchesSearch = p.name.toLowerCase().includes(search);
    return inCategory && matchesSearch;
  });

  if (!filtered || filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <div className="text-5xl mb-2">😔</div>
        <p className="text-lg font-medium">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {filtered.map((product: any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
