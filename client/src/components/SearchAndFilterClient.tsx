"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

type Props = {
  initialProducts: Product[];
};

export default function SearchAndFilterClient({ initialProducts }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const pageSize = 9; // products per page

  // Extract categories dynamically
  const categories = useMemo(() => {
    const unique = new Set(
      initialProducts.map((p) => p.category || "Uncategorized")
    );
    return ["all", ...Array.from(unique)];
  }, [initialProducts]);

  // Filter & sort logic
  const filtered = useMemo(() => {
    let results = initialProducts.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = category === "all" || p.category === category;
      return matchesSearch && matchesCategory;
    });

    if (sort === "low-to-high") {
      results = [...results].sort((a, b) => a.price - b.price);
    } else if (sort === "high-to-low") {
      results = [...results].sort((a, b) => b.price - a.price);
    }

    return results;
  }, [search, category, sort, initialProducts]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Reset everything
  function clearFilters() {
    setSearch("");
    setCategory("all");
    setSort("default");
    setPage(1);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1 border rounded px-3 py-2"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2"
        >
          <option value="default">Sort by</option>
          <option value="low-to-high">Price: Low → High</option>
          <option value="high-to-low">Price: High → Low</option>
        </select>

        <button
          onClick={clearFilters}
          className="border px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
        >
          Clear Filters
        </button>
      </div>

      {/* Products grid */}
      {paginated.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginated.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="border rounded-lg p-4 hover:shadow"
              >
                <Image
                  src={product.image ?? "/fallback-image.jpg"}
                  alt={product.title || "Product image"}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover rounded mb-3"
                  unoptimized
                />
                <h2 className="font-semibold">{product.title}</h2>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
