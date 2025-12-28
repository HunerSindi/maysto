// src/app/ciramic_company/components/FilterSection.tsx
'use client';

import { Search, RotateCcw, History } from 'lucide-react';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface FilterProps {
    search: string;
    setSearch: (val: string) => void;
    limit: number;
    setLimit: (val: number) => void;
    history: boolean;
    setHistory: (val: boolean) => void;
}

export default function FilterSection({
    search, setSearch, limit, setLimit, history, setHistory
}: FilterProps) {

    const handleReset = () => {
        setSearch('');
        setLimit(10);
        setHistory(false); // Reset to Active view
    };

    return (
        <div className="bg-white border border-gray-400 p-3 mb-2 flex flex-col md:flex-row flex-wrap gap-3 items-end print:hidden shadow-sm">

            {/* Search */}
            <div className="flex flex-col w-full md:w-64">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">Search Expenses</label>
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 text-gray-400" size={14} />
                    <input
                        type="text"
                        className="w-full h-9 border border-gray-400 pl-8 pr-2 text-sm focus:border-blue-600 focus:outline-none transition-colors rounded-sm"
                        placeholder="Category, Note, Amount..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Limit */}
            <div className="flex flex-col w-28">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">Rows Per Page</label>
                <Select value={limit.toString()} onValueChange={(val) => setLimit(Number(val))}>
                    <SelectTrigger className="w-full h-9 border-gray-400 rounded-sm text-sm focus:ring-0 focus:border-blue-600 font-bold">
                        <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10 Rows</SelectItem>
                        <SelectItem value="20">20 Rows</SelectItem>
                        <SelectItem value="50">50 Rows</SelectItem>
                        <SelectItem value="100">100 Rows</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* History Toggle Button */}
            <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">View Mode</label>
                <button
                    onClick={() => setHistory(!history)}
                    className={`h-9 px-3 flex items-center gap-2 text-xs font-bold uppercase border rounded-sm transition-colors ${history
                            ? 'bg-amber-100 border-amber-400 text-amber-800'
                            : 'bg-white border-gray-400 text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <History size={14} />
                    {history ? 'History View (All)' : 'Active Only'}
                </button>
            </div>

            {/* Reset */}
            <div className="ml-auto">
                <button
                    onClick={handleReset}
                    className="h-9 bg-gray-100 text-gray-700 px-3 text-xs font-bold uppercase border border-gray-400 hover:bg-gray-200 flex items-center gap-2 transition-colors rounded-sm"
                >
                    <RotateCcw size={14} /> Reset
                </button>
            </div>
        </div>
    );
}