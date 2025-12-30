'use client';

import { Search, Filter, RotateCcw } from 'lucide-react';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
    const { t } = useLanguage();

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
                    {t.personal.filters.search_label}
                </label>
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 text-gray-400" size={14} />
                    <input
                        type="text"
                        className="w-full h-9 border border-gray-400 pl-8 pr-2 text-sm focus:border-red-600 focus:outline-none transition-colors"
                        placeholder={t.personal.filters.search_ph}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* 2. Sort Order */}
            <div className="flex flex-col w-40">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">
                    {t.personal.filters.sort_label}
                </label>
                <Select
                    value={sort}
                    onValueChange={(val) => setSort(val as 'asc' | 'desc')}
                >
                    <SelectTrigger className="w-full h-9 border-gray-400 rounded-none text-sm focus:ring-0 focus:border-red-600">
                        <SelectValue placeholder={t.personal.filters.sort_ph} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="desc">{t.personal.filters.sort_desc}</SelectItem>
                        <SelectItem value="asc">{t.personal.filters.sort_asc}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* 3. List Size */}
            <div className="flex flex-col w-28">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">
                    {t.personal.filters.rows_label}
                </label>
                <Select
                    value={limit.toString()}
                    onValueChange={(val) => setLimit(Number(val))}
                >
                    <SelectTrigger className="w-full h-9 border-gray-400 rounded-none text-sm focus:ring-0 focus:border-red-600 font-bold">
                        <SelectValue placeholder="20" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="500">500</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Buttons */}
            <div className="flex gap-1 ml-auto">
                <button
                    className="h-9 bg-red-700 text-white px-4 text-xs font-bold uppercase border border-red-900 hover:bg-red-800 flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Filter size={14} /> {t.personal.filters.filter_btn}
                </button>

                <button
                    onClick={handleReset}
                    className="h-9 bg-gray-100 text-gray-700 px-3 text-xs font-bold uppercase border border-gray-400 hover:bg-gray-200 flex items-center gap-2 transition-colors"
                >
                    <RotateCcw size={14} /> {t.personal.filters.reset_btn}
                </button>
            </div>
        </div>
    );
}