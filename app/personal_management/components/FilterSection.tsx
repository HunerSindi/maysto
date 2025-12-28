'use client';

import { Search, Filter, RotateCcw } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface FilterProps {
    search: string;
    setSearch: (val: string) => void;
    limit: number;
    setLimit: (val: number) => void;
    sort: 'asc' | 'desc';
    setSort: (val: 'asc' | 'desc') => void;
}

export default function FilterSection({
    search, setSearch,
    limit, setLimit,
    sort, setSort
}: FilterProps) {

    // Handler to reset all filters
    const handleReset = () => {
        setSearch('');
        setLimit(20);
        setSort('desc');
    };

    return (
        <div className="bg-white border border-gray-400 p-3 mb-2 flex flex-col md:flex-row flex-wrap gap-3 items-end print:hidden shadow-sm">

            {/* 1. General Search */}
            <div className="flex flex-col w-full md:w-64">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">
                    Search Customer
                </label>
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 text-gray-400" size={14} />
                    <input
                        type="text"
                        className="w-full h-9 border border-gray-400 pl-8 pr-2 text-sm focus:border-red-600 focus:outline-none transition-colors"
                        placeholder="Name, Phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* 2. Sort Order (Using Shadcn) */}
            <div className="flex flex-col w-40">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">
                    Sort Order
                </label>
                <Select
                    value={sort}
                    onValueChange={(val) => setSort(val as 'asc' | 'desc')}
                >
                    <SelectTrigger className="w-full h-9 border-gray-400 rounded-none text-sm focus:ring-0 focus:border-red-600">
                        <SelectValue placeholder="Select Order" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="desc">Newest First</SelectItem>
                        <SelectItem value="asc">Oldest First</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* 3. List Size (Limit) (Using Shadcn) */}
            <div className="flex flex-col w-28">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">
                    Show Rows
                </label>
                <Select
                    value={limit.toString()}
                    onValueChange={(val) => setLimit(Number(val))}
                >
                    <SelectTrigger className="w-full h-9 border-gray-400 rounded-none text-sm focus:ring-0 focus:border-red-600 font-bold">
                        <SelectValue placeholder="20" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10 Rows</SelectItem>
                        <SelectItem value="20">20 Rows</SelectItem>
                        <SelectItem value="50">50 Rows</SelectItem>
                        <SelectItem value="100">100 Rows</SelectItem>
                        <SelectItem value="500">500 Rows</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Buttons */}
            <div className="flex gap-1 ml-auto">
                {/* Visual Filter Button (Search is mostly automatic/reactive, but this matches design) */}
                <button
                    className="h-9 bg-red-700 text-white px-4 text-xs font-bold uppercase border border-red-900 hover:bg-red-800 flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Filter size={14} /> Filter
                </button>

                {/* Reset Button */}
                <button
                    onClick={handleReset}
                    className="h-9 bg-gray-100 text-gray-700 px-3 text-xs font-bold uppercase border border-gray-400 hover:bg-gray-200 flex items-center gap-2 transition-colors"
                >
                    <RotateCcw size={14} /> Reset
                </button>
            </div>
        </div>
    );
}