"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchTerm } from "@/store/slices/filterSlice";
import { useGetAllProductsQuery } from "@/store/services/woocommerceApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

let debounceTimeout: NodeJS.Timeout;

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const search = useAppSelector((state) => state.filter.searchTerm);
  const { data: products } = useGetAllProductsQuery();

  const [inputValue, setInputValue] = useState(search);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // 🔁 Debounce + local search
  useEffect(() => {
    clearTimeout(debounceTimeout);
    if (inputValue.trim().length < 1 || !products) {
      setFiltered([]);
      setShowResults(false);
      dispatch(setSearchTerm(""));
      return;
    }

    debounceTimeout = setTimeout(() => {
      dispatch(setSearchTerm(inputValue));
      const results = products.filter((p: any) =>
        p.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFiltered(results);
      setShowResults(true);
    }, 300);
  }, [inputValue, products, dispatch]);

  const handleClear = () => {
    setInputValue("");
    dispatch(setSearchTerm(""));
    setFiltered([]);
    setShowResults(false);
  };

  return (
    <div className="relative w-full">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
        className="pr-12 rounded-full focus-visible:ring-0 focus-visible:outline-none"
      />

      {/* 🔍 Icon */}
      <div className="absolute right-0 top-0 h-full flex items-center px-3 bg-black rounded-r-full gap-2">
        {inputValue && (
          <IoClose
            className="text-white text-xl cursor-pointer"
            onClick={handleClear}
          />
        )}
        <CiSearch className="text-white text-xl" />
      </div>

      {/* 📃 Suggestions */}
      {showResults && (
        <ul className="absolute z-10 bg-white shadow-md mt-2 w-full rounded-md max-h-64 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.slice(0, 8).map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                onClick={() => {
                  setShowResults(false);
                  setInputValue("");
                  dispatch(setSearchTerm(""));
                }}
              >
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Image
                    src={product.images[0]?.src || "/placeholder.png"}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                    width={150}
                    height={70}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ${product.price}
                    </p>
                  </div>
                </li>
              </Link>
            ))
          ) : (
            <li className="px-4 py-4 text-sm text-gray-500">
              😔 No results found.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
