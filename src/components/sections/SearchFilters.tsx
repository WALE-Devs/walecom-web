"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import type { Category } from "@/types/product";

interface SearchFiltersProps {
    categories: Category[];
}

export default function SearchFilters({ categories }: SearchFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // To avoid triggering on first render if params match
    const isFirstRender = useRef(true);

    // Debounce search input
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    // Apply filters when debouncedSearch or category changes
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const params = new URLSearchParams();
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (category) params.set("category", category);

        router.push(`/catalog?${params.toString()}`);
    }, [debouncedSearch, category, router]);

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-10 bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Buscar producto</label>
                <input
                    type="text"
                    placeholder="Nombre del producto..."
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="w-full md:w-80">
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                <select
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-all appearance-none cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
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
        </div>
    );
}
