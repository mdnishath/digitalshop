"use client";

import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  slug: string;
  name: string;
  price: string;
  images: { src: string }[];
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden bg-white cursor-pointer">
        <Image
          src={product.images[0]?.src || "/placeholder.png"}
          alt={product.name}
          width={300}
          height={160}
          priority={true}
          className="w-full h-48 object-cover"
        />
        <div className="p-3">
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
          <p className="text-primary font-bold mt-1">${product.price}</p>
        </div>
      </div>
    </Link>
  );
}
