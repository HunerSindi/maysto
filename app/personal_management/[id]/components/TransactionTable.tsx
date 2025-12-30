'use client';

import { Transaction } from '@/types/personal';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface TxTableProps {
    transactions: Transaction[];
    onAddClick: () => void;
    onEdit: (tx: Transaction) => void;
    onDelete: (tx: Transaction) => void;
}

export default function TransactionTable({ transactions, onAddClick, onEdit, onDelete }: TxTableProps) {
    const { t, language } = useLanguage();
    const isRtl = language === 'ar' || language === 'ku';
    const safeTransactions = transactions || [];

    return (
        <div className="flex flex-col h-full bg-white border border-gray-400 shadow-sm relative">

            {/* Toolbar Area */}
            <div className="bg-gray-50 border-b border-gray-400 p-2 flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase text-gray-600">{t.personal_detail.transactions.title}</h3>
                <button
                    onClick={onAddClick}
                    className="flex items-center gap-1 bg-red-700 text-white px-3 py-1 text-xs font-bold uppercase hover:bg-red-800 transition shadow-sm border border-red-900"
                >
                    <Plus size={14} /> {t.personal_detail.transactions.new_tx}
                </button>
            </div>

            {/* Table Area */}
            <div className="flex-1 overflow-auto relative">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-400 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase w-16 text-center">{t.personal_detail.transactions.table.id}</th>
                            <th className={`p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase w-32 ${isRtl ? 'text-right' : 'text-left'}`}>{t.personal_detail.transactions.table.date}</th>
                            <th className={`p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase ${isRtl ? 'text-right' : 'text-left'}`}>{t.personal_detail.transactions.table.desc}</th>
                            <th className={`p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase w-32 ${isRtl ? 'text-left' : 'text-right'}`}>{t.personal_detail.transactions.table.amount}</th>
                            <th className="p-2 text-xs font-bold uppercase text-center w-20">{t.personal_detail.transactions.table.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm bg-white">
                        {safeTransactions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-500 italic">
                                    {t.personal_detail.transactions.table.empty}
                                </td>
                            </tr>
                        ) : (
                            safeTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-blue-50 group transition-colors">
                                    <td className="p-2 border-r rtl:border-l border-gray-100 font-mono text-xs text-center text-gray-500">
                                        #{tx.id}
                                    </td>
                                    <td className={`p-2 border-r rtl:border-l border-gray-100 text-xs text-gray-600 whitespace-nowrap ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {new Date(tx.created_at).toLocaleDateString()}
                                    </td>
                                    <td className={`p-2 border-r rtl:border-l border-gray-100 text-xs text-gray-700 ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {tx.note}
                                    </td>
                                    <td className={`p-2 border-r rtl:border-l border-gray-100 text-xs font-bold font-mono ${isRtl ? 'text-left' : 'text-right'} ${tx.amount < 0 ? 'text-red-600' : 'text-black'}`}>
                                        ${tx.amount.toLocaleString()}
                                    </td>
                                    <td className="p-2 text-center flex justify-center gap-2">
                                        <button onClick={() => onEdit(tx)} className="text-gray-400 hover:text-amber-600 transition-colors">
                                            <Edit size={14} />
                                        </button>
                                        <button onClick={() => onDelete(tx)} className="text-gray-400 hover:text-red-600 transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Summary */}
            <div className="border-t border-gray-400 p-2 bg-gray-100 flex justify-between items-center text-xs font-bold uppercase text-gray-600">
                <span>{t.personal_detail.transactions.table.total} {safeTransactions.length}</span>
                <span>{t.personal_detail.transactions.table.end}</span>
            </div>
        </div>
    );
}