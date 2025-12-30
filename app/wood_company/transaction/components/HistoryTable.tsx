'use client';

import { WoodHistoryItem, WoodTransactionMeta } from '@/types/wood';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface TableProps {
    data: WoodHistoryItem[];
    meta: WoodTransactionMeta | null;
    loading: boolean;
    onPageChange: (n: number) => void;
}

export default function HistoryTable({ data, meta, loading, onPageChange }: TableProps) {
    const { t, language } = useLanguage();
    const isRtl = language === 'ar' || language === 'ku';

    const safeData = data || [];
    const totalItems = meta?.total_count || 0;
    const limit = meta?.limit || 10;
    const currentPage = meta?.page || 1;
    const totalPages = Math.ceil(totalItems / limit) || 1;

    return (
        <div className="flex flex-col h-[calc(100vh-320px)] bg-white border border-gray-400 shadow-sm">

            <div className="p-2 bg-gray-50 border-b border-gray-400 text-xs font-bold uppercase text-gray-600">
                {t.wood_transaction.table.title}
            </div>

            <div className="flex-1 overflow-auto relative bg-white">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 z-20 flex items-center justify-center backdrop-blur-sm">
                        <span className="font-bold text-sm uppercase bg-white px-4 py-2 border shadow border-gray-300 animate-pulse">{t.wood_transaction.table.loading}</span>
                    </div>
                )}
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-400 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase w-16 text-center">{t.wood_transaction.table.id}</th>
                            <th className={`p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase w-32 ${isRtl ? 'text-right' : 'text-left'}`}>{t.wood_transaction.table.date}</th>
                            <th className={`p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase w-24 ${isRtl ? 'text-left' : 'text-right'}`}>{t.wood_transaction.table.change}</th>
                            <th className={`p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase w-32 ${isRtl ? 'text-left' : 'text-right'}`}>{t.wood_transaction.table.new_balance}</th>
                            <th className={`p-2 text-xs font-bold uppercase ${isRtl ? 'text-right' : 'text-left'}`}>{t.wood_transaction.table.note}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm bg-white">
                        {safeData.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500 italic">{t.wood_transaction.table.empty}</td></tr>
                        ) : (
                            safeData.map((item) => (
                                <tr key={item.id} className="hover:bg-amber-50 transition-colors odd:bg-white even:bg-gray-50/50">
                                    <td className="p-2 border-r rtl:border-l border-gray-100 font-mono text-xs text-center text-gray-500">#{item.id}</td>
                                    <td className={`p-2 border-r rtl:border-l border-gray-100 text-xs text-gray-600 whitespace-nowrap ${isRtl ? 'text-right' : 'text-left'}`}>{new Date(item.created_at).toLocaleDateString()}</td>
                                    <td className={`p-2 border-r rtl:border-l border-gray-100 text-xs font-bold font-mono ${isRtl ? 'text-left' : 'text-right'} ${item.amount_added < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        {item.amount_added > 0 ? '+' : ''}{item.amount_added.toLocaleString()}
                                    </td>
                                    <td className={`p-2 border-r rtl:border-l border-gray-100 text-xs font-bold font-mono text-blue-800 ${isRtl ? 'text-left' : 'text-right'}`}>
                                        ${item.new_balance.toLocaleString()}
                                    </td>
                                    <td className={`p-2 text-xs text-gray-700 uppercase ${isRtl ? 'text-right' : 'text-left'}`}>{item.note || '-'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="border-t border-gray-400 p-2 bg-gray-100 flex justify-between items-center shrink-0 z-20">
                <span className="text-xs font-bold text-gray-600 uppercase">{t.wood_transaction.table.records}: {totalItems}</span>
                <div className="flex gap-1 items-center">
                    <button disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} className="px-3 py-1 bg-white border border-gray-400 text-xs font-bold hover:bg-gray-200 disabled:opacity-50 rounded-sm uppercase">{t.wood_transaction.table.prev}</button>
                    <span className="px-3 py-1 text-xs font-bold flex items-center bg-white border border-gray-300 h-full min-w-[3rem] justify-center">{currentPage} / {totalPages}</span>
                    <button disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)} className="px-3 py-1 bg-white border border-gray-400 text-xs font-bold hover:bg-gray-200 disabled:opacity-50 rounded-sm uppercase">{t.wood_transaction.table.next}</button>
                </div>
            </div>
        </div>
    );
}