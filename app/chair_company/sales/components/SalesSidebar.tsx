'use client';

import { Plus, Printer, TrendingUp } from 'lucide-react';
import { SaleMeta } from '@/types/chair';

interface SidebarProps {
    meta: SaleMeta | null;
    onAddClick: () => void;
}

export default function SalesSidebar({ meta, onAddClick }: SidebarProps) {
    const handlePrint = () => window.print();

    return (
        <div className="space-y-3 print:hidden">
            {/* Actions */}
            <div className="bg-white border border-gray-400 p-3 shadow-sm">
                <h3 className="text-[10px] font-bold uppercase text-gray-500 mb-2 border-b border-gray-300 pb-1">
                    Sales Actions
                </h3>
                <button
                    onClick={onAddClick}
                    className="w-full flex items-center justify-center gap-2 bg-green-700 text-white h-9 hover:bg-green-800 transition mb-2 shadow-sm border border-green-900 text-xs font-bold uppercase rounded-sm"
                >
                    <Plus size={14} /> New Sale
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
                    Income Summary
                </h3>

                <div className="mb-3">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <TrendingUp size={14} />
                        <span className="text-[10px] uppercase font-bold text-gray-600">Total Sales Revenue</span>
                    </div>
                    {/* Green Text for Income */}
                    <div className="text-xl font-mono font-bold border border-green-300 p-2 text-center bg-green-50 rounded-sm text-green-800">
                        ${meta?.total_sales?.toLocaleString() || 0}
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs border-t border-gray-200 pt-2">
                    <span className="text-gray-500 font-bold uppercase text-[10px]">Page Total</span>
                    <span className="font-mono font-bold text-black">${meta?.current_page_balance?.toLocaleString() || 0}</span>
                </div>
            </div>
        </div>
    );
}