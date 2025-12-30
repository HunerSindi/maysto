'use client';

import Link from 'next/link';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Customer, Meta } from '@/types/personal';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface TableProps {
    data: Customer[];
    meta: Meta | null;
    loading: boolean;
    onEdit: (c: Customer) => void;
    onDelete: (c: Customer) => void;
    onPageChange: (newPage: number) => void;
}

export default function CustomerTable({
    data, meta, loading, onEdit, onDelete, onPageChange
}: TableProps) {
    const { t, language } = useLanguage();
    const isRtl = language === 'ar' || language === 'ku';

    // FIX: Ensure safeData is always an array
    const safeData = Array.isArray(data) ? data : [];

    // Helper for pagination
    const totalItems = meta?.total_count || 0;
    const limit = meta?.limit || 20;
    const currentPage = meta?.page || 1;
    const totalPages = Math.ceil(totalItems / limit) || 1;

    return (
        <div className="flex flex-col h-[calc(100vh-168px)] bg-white border border-gray-400 shadow-sm print:h-auto print:border-none">

            {/* Table Scrollable Area */}
            <div className="flex-1 overflow-auto relative bg-white">

                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 bg-white/60 z-20 flex items-center justify-center backdrop-blur-sm">
                        <span className="font-bold text-sm uppercase bg-white px-4 py-2 border shadow border-gray-300 animate-pulse">
                            {t.personal.table.loading}
                        </span>
                    </div>
                )}

                <table className="w-full text-left border-collapse">
                    {/* Sticky Header */}
                    <thead className="bg-gray-100 border-b border-gray-400 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-16 text-center">{t.personal.table.id}</th>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase">{t.personal.table.name}</th>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-32">{t.personal.table.phone}</th>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-48">{t.personal.table.location}</th>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase text-right w-32">{t.personal.table.balance}</th>
                            <th className="p-2 text-xs font-bold uppercase text-center w-24">{t.personal.table.actions}</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-sm bg-white">
                        {safeData.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500 italic">
                                    {t.personal.table.empty}
                                </td>
                            </tr>
                        ) : (
                            safeData.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50 group transition-colors odd:bg-white even:bg-gray-50/50">
                                    <td className="p-2 border-r border-gray-100 font-mono text-xs text-center text-gray-500">
                                        #{item.id}
                                    </td>
                                    <td className="p-2 border-r border-gray-100 text-xs font-bold text-gray-700">
                                        {item.name}
                                    </td>
                                    <td className="p-2 border-r border-gray-100 text-xs text-gray-600 font-mono">
                                        {item.phone}
                                    </td>
                                    <td className="p-2 border-r border-gray-100 text-xs text-gray-500">
                                        {item.location || '-'}
                                    </td>
                                    <td className={`p-2 border-r border-gray-100 text-xs text-right font-bold font-mono ${item.balance < 0 ? 'text-red-600' : 'text-green-700'}`}>
                                        ${item.balance.toLocaleString()}
                                    </td>

                                    <td className="p-2 text-center flex justify-center gap-2">
                                        <Link href={`/personal_management/${item.id}`} title="View Details" className="text-gray-400 hover:text-blue-600 transition-colors">
                                            <Eye size={16} />
                                        </Link>
                                        <button onClick={() => onEdit(item)} title="Edit" className="text-gray-400 hover:text-amber-600 transition-colors">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => onDelete(item)} title="Delete" className="text-gray-400 hover:text-red-600 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div className="border-t border-gray-400 p-2 bg-gray-100 flex justify-between items-center shrink-0 z-20 print:hidden">
                <span className="text-xs font-bold text-gray-600 uppercase">
                    {t.personal.table.total}: {totalItems}
                </span>

                <div className="flex gap-1 items-center">
                    <button
                        disabled={currentPage <= 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="px-3 py-1 bg-white border border-gray-400 text-xs font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm uppercase transition-colors"
                    >
                        {t.personal.table.prev}
                    </button>

                    <span className="px-3 py-1 text-xs font-bold flex items-center bg-white border border-gray-300 h-full min-w-12 justify-center">
                        {currentPage} / {totalPages}
                    </span>

                    <button
                        disabled={currentPage >= totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="px-3 py-1 bg-white border border-gray-400 text-xs font-bold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm uppercase transition-colors"
                    >
                        {t.personal.table.next}
                    </button>
                </div>
            </div>
        </div>
    );
}