'use client';

import { TransactionHistoryItem, TransactionMeta } from '@/types/ciramic';

interface TableProps {
    data: TransactionHistoryItem[];
    meta: TransactionMeta | null;
    loading: boolean;
    onPageChange: (n: number) => void;
}

export default function HistoryTable({ data, meta, loading, onPageChange }: TableProps) {
    const safeData = data || [];
    const totalItems = meta?.total_count || 0;
    const limit = meta?.limit || 10;
    const currentPage = meta?.page || 1;
    const totalPages = Math.ceil(totalItems / limit) || 1;

    return (
        <div className="flex flex-col h-[calc(100vh-320px)] bg-white border border-gray-400 shadow-sm">

            {/* Header */}
            <div className="p-2 bg-gray-50 border-b border-gray-400 text-xs font-bold uppercase text-gray-600">
                Transaction History Log
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-auto relative bg-white">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 z-20 flex items-center justify-center backdrop-blur-sm">
                        <span className="font-bold text-sm uppercase bg-white px-4 py-2 border shadow border-gray-300 animate-pulse">Loading History...</span>
                    </div>
                )}
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-400 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-16 text-center">ID</th>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-32">Date</th>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-24 text-right">Change</th>
                            <th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-32 text-right">New Balance</th>
                            <th className="p-2 text-xs font-bold uppercase">Note / Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm bg-white">
                        {safeData.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500 italic">No history found.</td></tr>
                        ) : (
                            safeData.map((item) => (
                                <tr key={item.id} className="hover:bg-blue-50 transition-colors odd:bg-white even:bg-gray-50/50">
                                    <td className="p-2 border-r border-gray-100 font-mono text-xs text-center text-gray-500">#{item.id}</td>
                                    <td className="p-2 border-r border-gray-100 text-xs text-gray-600 whitespace-nowrap">{new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td className={`p-2 border-r border-gray-100 text-xs text-right font-bold font-mono ${item.amount_added < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        {item.amount_added > 0 ? '+' : ''}{item.amount_added.toLocaleString()}
                                    </td>
                                    <td className="p-2 border-r border-gray-100 text-xs text-right font-bold font-mono text-blue-800">
                                        ${item.new_balance.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-xs text-gray-700 uppercase">{item.note}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="border-t border-gray-400 p-2 bg-gray-100 flex justify-between items-center shrink-0 z-20">
                <span className="text-xs font-bold text-gray-600 uppercase">Records: {totalItems}</span>
                <div className="flex gap-1 items-center">
                    <button disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} className="px-3 py-1 bg-white border border-gray-400 text-xs font-bold hover:bg-gray-200 disabled:opacity-50 rounded-sm uppercase">Prev</button>
                    <span className="px-3 py-1 text-xs font-bold flex items-center bg-white border border-gray-300 h-full min-w-[3rem] justify-center">{currentPage} / {totalPages}</span>
                    <button disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)} className="px-3 py-1 bg-white border border-gray-400 text-xs font-bold hover:bg-gray-200 disabled:opacity-50 rounded-sm uppercase">Next</button>
                </div>
            </div>
        </div>
    );
}