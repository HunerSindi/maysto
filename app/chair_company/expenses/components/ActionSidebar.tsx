'use client';

import { Plus, Printer, DollarSign } from 'lucide-react';
import { ExpenseMeta } from '@/types/chair';

interface ActionSidebarProps {
    meta: ExpenseMeta | null;
    onAddClick: () => void;
}

export default function ActionSidebar({ meta, onAddClick }: ActionSidebarProps) {
    const handlePrint = () => window.print();

    return (
        <div className="space-y-3 print:hidden">
            {/* Actions */}
            <div className="bg-white border border-gray-400 p-3 shadow-sm">
                <h3 className="text-[10px] font-bold uppercase text-gray-500 mb-2 border-b border-gray-300 pb-1">
                    Quick Actions
                </h3>
                <button
                    onClick={onAddClick}
                    className="w-full flex items-center justify-center gap-2 bg-red-700 text-white h-9 hover:bg-red-800 transition mb-2 shadow-sm border border-red-900 text-xs font-bold uppercase rounded-sm"
                >
                    <Plus size={14} /> Add Expense
                </button>
                <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 border border-gray-400 h-9 hover:bg-gray-200 transition text-xs font-bold uppercase rounded-sm"
                >
                    <Printer size={14} /> Print List
                </button>
            </div>

            {/* Financials */}
            <div className="bg-white border border-gray-400 p-3 shadow-sm">
                <h3 className="text-[10px] font-bold uppercase text-gray-500 mb-2 border-b border-gray-300 pb-1">
                    Financial Summary
                </h3>

                <div className="mb-3">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <DollarSign size={14} />
                        <span className="text-[10px] uppercase font-bold text-gray-600">Total Expenses</span>
                    </div>
                    {/* Red border for cost */}
                    <div className="text-xl font-mono font-bold border border-red-300 p-2 text-center bg-gray-50 rounded-sm text-red-700">
                        ${meta?.total_expenses?.toLocaleString() || 0}
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs border-t border-gray-200 pt-2">
                    <span className="text-gray-500 font-bold uppercase text-[10px]">On This Page</span>
                    <span className="font-mono font-bold text-black">${meta?.current_page_balance?.toLocaleString() || 0}</span>
                </div>
            </div>
        </div>
    );
}