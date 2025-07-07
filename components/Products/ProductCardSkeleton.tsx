"use client";

export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 animate-pulse">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-48 w-full rounded-md bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
