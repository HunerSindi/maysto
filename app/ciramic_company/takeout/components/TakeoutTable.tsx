"use client";
import { CeramicTakeout } from "@/lib/api/ceramic-takeout";
import { Edit, Trash2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Props {
    data: CeramicTakeout[];
    loading: boolean;
    page: number;
    limit: number;
    totalCount: number;
    onPageChange: (p: number) => void;
    onEdit: (item: CeramicTakeout) => void;
    onDelete: (id: number) => void;
}

export default function TakeoutTable({ data, loading, page, limit, totalCount, onPageChange, onEdit, onDelete }: Props) {
    const { t, language } = useLanguage();
    const isRtl = language === 'ar' || language === 'ku';

    // FIX: Guard against null data
    const safeData = data || [];
    const totalPages = Math.ceil(totalCount / limit) || 1;

    return (
        <div className="flex flex-col h-full bg-white border border-gray-400">
            <div className="flex-1 overflow-auto relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center font-bold">
                        {t.ceramic_takeout.table.loading}
                    </div>
                )}
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-400 sticky top-0 z-0 shadow-sm">
                        <tr>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-12 text-center">{t.ceramic_takeout.table.id}</th>
                            <th className={`p-2 border-r border-gray-300 text-xs font-bold uppercase w-32 ${isRtl ? 'text-right' : 'text-left'}`}>{t.ceramic_takeout.table.date}</th>
                            <th className={`p-2 border-r border-gray-300 text-xs font-bold uppercase ${isRtl ? 'text-right' : 'text-left'}`}>{t.ceramic_takeout.table.note}</th>
                            <th className={`p-2 border-r border-gray-300 text-xs font-bold uppercase w-32 ${isRtl ? 'text-left' : 'text-right'}`}>{t.ceramic_takeout.table.amount}</th>
                            <th className="p-2 text-center text-xs font-bold uppercase w-24">{t.ceramic_takeout.table.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                        {safeData.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500 italic">{t.ceramic_takeout.table.no_data}</td></tr>
                        ) : (
                            safeData.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50 group">
                                    <td className="p-2 border-r border-gray-100 text-center text-gray-500 font-mono">{item.id}</td>
                                    <td className={`p-2 border-r border-gray-100 text-xs font-mono ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {item.created_at ? new Date(item.created_at).toLocaleDateString() : "-"}
                                    </td>
                                    <td className={`p-2 border-r border-gray-100 font-bold text-gray-800 ${isRtl ? 'text-right' : 'text-left'}`}>{item.note}</td>
                                    <td className={`p-2 border-r border-gray-100 font-mono font-bold text-red-600 ${isRtl ? 'text-left' : 'text-right'}`}>
                                        {item.amount.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-center flex items-center justify-center gap-2">
                                        <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
                                        <button onClick={() => onDelete(item.id!)} className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="border-t border-gray-400 p-2 bg-gray-50 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-600">{t.ceramic_takeout.table.total}: {totalCount}</span>
                <div className="flex gap-1">
                    <button disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="px-3 py-1 bg-white border border-gray-400 text-xs font-bold hover:bg-gray-100 disabled:opacity-50">{t.ceramic_takeout.table.prev}</button>
                    <span className="px-3 py-1 text-xs font-bold bg-white border border-gray-400">{page}</span>
                    <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} className="px-3 py-1 bg-white border border-gray-400 text-xs font-bold hover:bg-gray-100 disabled:opacity-50">{t.ceramic_takeout.table.next}</button>
                </div>
            </div>
        </div>
    );
}