"use client";
import { Search, RotateCcw } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FilterProps {
    search: string;
    setSearch: (v: string) => void;
    limit: number;
    setLimit: (v: number) => void;
}

export default function TakeoutFilter({
    search, setSearch,
    limit, setLimit
}: FilterProps) {
    const { t } = useLanguage();

    const handleReset = () => {
        setSearch('');
        setLimit(10);
    };

    return (
        <div className="bg-white border border-gray-400 p-3 mb-2 flex flex-col md:flex-row flex-wrap gap-3 items-end print:hidden shadow-sm">

            {/* Search */}
            <div className="flex flex-col w-full md:w-64">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">
                    {t.ceramic_takeout.filters.search}
                </label>
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 text-gray-400" size={14} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-9 border border-gray-400 pl-8 pr-2 text-sm focus:border-blue-600 outline-none rounded-sm transition-colors"
                    />
                </div>
            </div>

            {/* Limit */}
            <div className="flex flex-col w-28">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">{t.ceramic_takeout.filters.rows}</label>
                <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="w-full h-9 border border-gray-400 px-2 text-sm font-bold focus:border-blue-600 outline-none rounded-sm bg-white"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={500}>500</option>
                </select>
            </div>

            {/* Reset */}
            <div className="ml-auto">
                <button
                    onClick={handleReset}
                    className="h-9 bg-gray-100 text-gray-700 px-3 text-xs font-bold uppercase border border-gray-400 hover:bg-gray-200 flex items-center gap-2 rounded-sm"
                >
                    <RotateCcw size={14} /> {t.ceramic_takeout.filters.reset}
                </button>
            </div>
        </div>
    );
}