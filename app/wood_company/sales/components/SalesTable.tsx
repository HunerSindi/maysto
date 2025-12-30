'use client';

import { WoodSale, WoodSaleMeta } from '@/types/wood';
import { Edit, Trash2 } from 'lucide-react';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface TableProps {
    data: WoodSale[];
    meta: WoodSaleMeta | null;
    loading: boolean;
    onEdit: (s: WoodSale) => void;
    onDelete: (s: WoodSale) => void;
    onPageChange: (n: number) => void;
}

export default function SalesTable({ data, meta, loading, onEdit, onDelete, onPageChange }: TableProps) {
    const { t } = useLanguage();
    const safeData = data || [];
    const totalItems = meta?.total_count || 0;
    const limit = meta?.limit || 10;
    const currentPage = meta?.page || 1;
    const totalPages = Math.ceil(totalItems / limit) || 1;

    return (
        <div className="flex flex-col h-[calc(100vh-173px)] bg-white border border-gray-400 shadow-sm print:h-auto print:border-none">
            <div className="flex-1 overflow-auto relative bg-white">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 z-20 flex items-center justify-center backdrop-blur-sm">
                        <span className="font-bold text-sm uppercase bg-white px-4 py-2 border shadow border-gray-300 animate-pulse">{t.wood_sales.table.loading}</span>
                    </div>
                )}
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-400 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-16 text-center">{t.wood_sales.table.id}</th>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-24">{t.wood_sales.table.date}</th>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-48">{t.wood_sales.table.customer}</th>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase">{t.wood_sales.table.note}</th>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase text-right w-32">{t.wood_sales.table.amount}</th>
                            <th className="p-2 text-xs font-bold uppercase text-center w-24">{t.wood_sales.table.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm bg-white">
                        {safeData.length === 0 ? (
                            <tr><td colSpan={6} className="p-8 text-center text-gray-500 italic">{t.wood_sales.table.empty}</td></tr>
                        ) : (
                            safeData.map((item) => (
                                <tr key={item.id} className={`hover:bg-amber-50 group transition-colors ${item.is_hidden ? 'bg-gray-100 opacity-75' : 'odd:bg-white even:bg-gray-50/50'}`}>
                                    <td className="p-2 border-r border-gray-100 font-mono text-xs text-center text-gray-500">#{item.id}</td>
                                    <td className="p-2 border-r border-gray-100 text-xs text-gray-600 whitespace-nowrap">{new Date(item.created_at).toLocaleDateString()}</td>
                                    <td className="p-2 border-r border-gray-100 text-xs">
                                        <div className="font-bold text-gray-800">{item.customer_name}</div>
                                        <div className="text-[10px] text-gray-500">{item.customer_phone}</div>
                                    </td>
                                    <td className="p-2 border-r border-gray-100 text-xs text-gray-700">{item.note}</td>
                                    <td className="p-2 border-r border-gray-100 text-xs text-right font-bold font-mono text-green-700">
                                        ${item.amount.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-center flex justify-center gap-2">
                                        <button onClick={() => onEdit(item)} className="text-gray-400 hover:text-amber-600"><Edit size={16} /></button>
                                        <button onClick={() => onDelete(item)} className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="border-t border-gray-400 p-2 bg-gray-100 flex justify-between items-center shrink-0 z-20 print:hidden">
                <span className="text-xs font-bold text-gray-600 uppercase">{t.wood_sales.table.total}: {totalItems}</span>
                <div className="flex gap-1 items-center">
                    <button disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} className="px-3 py-1 bg-white border border-gray-400 text-xs font-bold hover:bg-gray-200 disabled:opacity-50 rounded-sm uppercase">{t.wood_sales.table.prev}</button>
                    <span className="px-3 py-1 text-xs font-bold flex items-center bg-white border border-gray-300 h-full min-w-[3rem] justify-center">{currentPage} / {totalPages}</span>
                    <button disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)} className="px-3 py-1 bg-white border border-gray-400 text-xs font-bold hover:bg-gray-200 disabled:opacity-50 rounded-sm uppercase">{t.wood_sales.table.next}</button>
                </div>
            </div>
        </div>
    );
}