'use client';
import { WoodTransaction } from '@/types/wood';
import { Plus } from 'lucide-react';
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DetailTransactions({ transactions, onAdjust }: { transactions: WoodTransaction[], onAdjust: () => void }) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col h-full bg-white border border-gray-400 shadow-sm relative">
            <div className="bg-gray-50 border-b border-gray-400 p-2 flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase text-gray-600">{t.wood_customer_detail.transactions.title}</h3>
                <button onClick={onAdjust} className="flex items-center gap-1 bg-amber-700 text-white px-3 py-1 text-xs font-bold uppercase hover:bg-amber-800 transition border border-amber-900 rounded-sm">
                    <Plus size={14} /> {t.wood_customer_detail.transactions.adjust_balance}
                </button>
            </div>
            <div className="flex-1 overflow-auto relative">
                <table className="w-full text-left rtl:text-right border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-400 sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase w-16 text-center">{t.wood_customer_detail.transactions.table.id}</th>
                            <th className="p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase w-32">{t.wood_customer_detail.transactions.table.date}</th>
                            <th className="p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase">{t.wood_customer_detail.transactions.table.note}</th>
                            <th className="p-2 border-r rtl:border-l border-gray-300 text-xs font-bold uppercase text-right rtl:text-left w-32">{t.wood_customer_detail.transactions.table.amount}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                        {transactions.length === 0 ? (
                            <tr><td colSpan={4} className="p-8 text-center text-gray-500 italic">{t.wood_customer_detail.transactions.table.empty}</td></tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-amber-50">
                                    <td className="p-2 border-r rtl:border-l border-gray-100 font-mono text-center text-gray-500">#{tx.id}</td>
                                    <td className="p-2 border-r rtl:border-l border-gray-100 text-xs whitespace-nowrap">{new Date(tx.created_at).toLocaleDateString()}</td>
                                    <td className="p-2 border-r rtl:border-l border-gray-100 text-xs">{tx.note}</td>
                                    <td className={`p-2 border-r rtl:border-l border-gray-100 text-xs text-right rtl:text-left font-bold font-mono ${tx.amount < 0 ? 'text-green-700' : 'text-red-700'}`}>
                                        {tx.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}