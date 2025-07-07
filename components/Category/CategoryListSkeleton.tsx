// components/CategoryListSkeleton.tsx
export default function CategoryListSkeleton() {
  return (
    <ul className="space-y-3 p-4 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <li key={i} className="h-4 w-3/4 rounded bg-gray-200" />
      ))}
    </ul>
  );
}
