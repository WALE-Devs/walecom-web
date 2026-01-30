"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { Category } from "@/types/product";

interface SearchFiltersProps {
    categories: Category[];
}

export default function SearchFilters({ categories }: SearchFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");

    // Update URL manually when filters change
    const applyFilters = () => {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (category) params.set("category", category);

        router.push(`/catalog?${params.toString()}`);
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-10 bg-gray-50 p-6 rounded-xl">
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Buscar producto</label>
                <input
                    type="text"
                    placeholder="Nombre del producto..."
                    className="w-full border p-2 rounded-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                />
            </div>

            <div className="w-full md:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                    className="w-full border p-2 rounded-md"
                    value={category}
                    onChange={(e) => {
                        setCategory(e.target.value);
                        // Apply category filter immediately
                        const params = new URLSearchParams();
                        if (search) params.set("search", search);
                        if (e.target.value) params.set("category", e.target.value);
                        router.push(`/catalog?${params.toString()}`);
                    }}
                >
                    <option value="">Todas las categorías</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-end">
                <button
                    onClick={applyFilters}
                    className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Filtrar
                </button>
            </div>
        </div>
    );
}
