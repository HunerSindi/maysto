'use client';

import { Search, RotateCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterProps {
    search: string; setSearch: (v: string) => void;
    limit: number; setLimit: (v: number) => void;
}

export default function CustomerFilter({ search, setSearch, limit, setLimit }: FilterProps) {
    const handleReset = () => { setSearch(''); setLimit(10); };

    return (
        <div className="bg-white border border-gray-400 p-3 mb-2 flex flex-col md:flex-row gap-3 items-end print:hidden shadow-sm">
            <div className="flex flex-col w-full md:w-64">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">Find Customer</label>
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 text-gray-400" size={14} />
                    <input
                        type="text"
                        className="w-full h-9 border border-gray-400 pl-8 pr-2 text-sm focus:border-amber-600 outline-none rounded-sm transition-colors"
                        placeholder="Name, Phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col w-28">
                <label className="text-[10px] font-bold uppercase text-gray-600 mb-1">Rows</label>
                <Select value={limit.toString()} onValueChange={(val) => setLimit(Number(val))}>
                    <SelectTrigger className="w-full h-9 border-gray-400 rounded-sm text-sm font-bold"><SelectValue placeholder="10" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10 Rows</SelectItem>
                        <SelectItem value="20">20 Rows</SelectItem>
                        <SelectItem value="50">50 Rows</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="ml-auto">
                <button onClick={handleReset} className="h-9 bg-gray-100 text-gray-700 px-3 text-xs font-bold uppercase border border-gray-400 hover:bg-gray-200 flex items-center gap-2 rounded-sm"><RotateCcw size={14} /> Reset</button>
            </div>
        </div>
    );
}