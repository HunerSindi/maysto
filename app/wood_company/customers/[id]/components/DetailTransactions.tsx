'use client';
import { WoodTransaction } from '@/types/wood';
import { Plus } from 'lucide-react';

export default function DetailTransactions({ transactions, onAdjust }: { transactions: WoodTransaction[], onAdjust: () => void }) {
    return (
        <div className="flex flex-col h-full bg-white border border-gray-400 shadow-sm relative">
            <div className="bg-gray-50 border-b border-gray-400 p-2 flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase text-gray-600">History</h3>
                <button onClick={onAdjust} className="flex items-center gap-1 bg-amber-700 text-white px-3 py-1 text-xs font-bold uppercase hover:bg-amber-800 transition border border-amber-900 rounded-sm"><Plus size={14} /> Adjust Balance</button>
            </div>
            <div className="flex-1 overflow-auto relative">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 border-b border-gray-400 sticky top-0 z-10 shadow-sm">
                        <tr><th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-16 text-center">ID</th><th className="p-2 border-r border-gray-300 text-xs font-bold uppercase w-32">Date</th><th className="p-2 border-r border-gray-300 text-xs font-bold uppercase">Note</th><th className="p-2 border-r border-gray-300 text-xs font-bold uppercase text-right w-32">Amount</th></tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-sm">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-amber-50">
                                <td className="p-2 border-r border-gray-100 font-mono text-center text-gray-500">#{tx.id}</td>
                                <td className="p-2 border-r border-gray-100 text-xs whitespace-nowrap">{new Date(tx.created_at).toLocaleDateString()}</td>
                                <td className="p-2 border-r border-gray-100 text-xs">{tx.note}</td>
                                <td className={`p-2 border-r border-gray-100 text-xs text-right font-bold font-mono ${tx.amount < 0 ? 'text-green-700' : 'text-red-700'}`}>{tx.amount.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}