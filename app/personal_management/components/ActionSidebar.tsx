'use client';

import { Plus, Printer, Wallet } from 'lucide-react';
import { Meta } from '@/types/personal';

interface ActionSidebarProps {
    meta: Meta | null;
    onAddClick: () => void;
}

export default function ActionSidebar({ meta, onAddClick }: ActionSidebarProps) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-3 print:hidden">

            {/* 1. Actions Panel */}
            <div className="bg-white border border-gray-400 p-3 shadow-sm">
                <h3 className="text-xs font-bold uppercase text-gray-700 mb-3 border-b border-gray-300 pb-1">
                    Quick Actions
                </h3>

                <button
                    onClick={onAddClick}
                    className="w-full flex items-center justify-center gap-2 bg-red-700 text-white h-9 hover:bg-red-800 transition mb-2 shadow-sm border border-red-900 text-xs font-bold uppercase"
                >
                    <Plus size={14} /> Add Customer
                </button>

                <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 border border-gray-400 h-9 hover:bg-gray-200 transition text-xs font-bold uppercase"
                >
                    <Printer size={14} /> Print List
                </button>
            </div>

            {/* 2. Financial Overview Panel */}
            <div className="bg-white border border-gray-400 p-3 shadow-sm">
                <h3 className="text-xs font-bold uppercase text-gray-700 mb-3 border-b border-gray-300 pb-1">
                    Financial Overview
                </h3>

                <div className="mb-3">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Wallet size={14} />
                        <span className="text-[10px] uppercase font-bold tracking-wide">Global Net Balance</span>
                    </div>
                    {/* LCD Style Display Box */}
                    <div className={`text-2xl font-mono font-bold border p-2 text-center bg-gray-50 ${meta?.total_global_balance && meta.total_global_balance < 0 ? 'text-red-700 border-red-300' : 'text-green-700 border-green-300'}`}>
                        ${meta?.total_global_balance?.toLocaleString() || 0}
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs border-t border-gray-200 pt-2">
                    <span className="text-gray-500 font-bold uppercase text-[10px]">Total Records</span>
                    <span className="font-mono font-bold text-black">{meta?.total_count || 0}</span>
                </div>
            </div>
        </div>
    );
}