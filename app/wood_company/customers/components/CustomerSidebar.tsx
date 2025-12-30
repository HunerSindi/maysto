'use client';

import { Plus, Printer, Users, Wallet } from 'lucide-react';
import { WoodCustomerMeta } from '@/types/wood';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SidebarProps {
    meta: WoodCustomerMeta | null;
    onAddClick: () => void;
}

export default function CustomerSidebar({ meta, onAddClick }: SidebarProps) {
    const { t } = useLanguage();
    const handlePrint = () => window.print();

    return (
        <div className="space-y-3 print:hidden">
            {/* Actions */}
            <div className="bg-white border border-gray-400 p-3 shadow-sm">
                <h3 className="text-[10px] font-bold uppercase text-gray-500 mb-2 border-b border-gray-300 pb-1">
                    {t.wood_customers.actions.title}
                </h3>
                <button
                    onClick={onAddClick}
                    className="w-full flex items-center justify-center gap-2 bg-amber-700 text-white h-9 hover:bg-amber-800 transition mb-2 shadow-sm border border-amber-900 text-xs font-bold uppercase rounded-sm"
                >
                    <Plus size={14} /> {t.wood_customers.actions.new_customer}
                </button>
                <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 border border-gray-400 h-9 hover:bg-gray-200 transition text-xs font-bold uppercase rounded-sm"
                >
                    <Printer size={14} /> {t.wood_customers.actions.print}
                </button>
            </div>

            {/* Financials */}
            <div className="bg-white border border-gray-400 p-3 shadow-sm">
                <h3 className="text-[10px] font-bold uppercase text-gray-500 mb-2 border-b border-gray-300 pb-1">
                    {t.wood_customers.actions.accounts_summary}
                </h3>

                <div className="mb-3">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Wallet size={14} />
                        <span className="text-[10px] uppercase font-bold text-gray-600">{t.wood_customers.actions.total_balance}</span>
                    </div>
                    {/* Display Total Debt/Credit */}
                    <div className={`text-xl font-mono font-bold border p-2 text-center rounded-sm ${(meta?.total_global_balance || 0) < 0
                        ? 'text-red-700 border-red-300 bg-red-50'
                        : 'text-green-700 border-green-300 bg-green-50'
                        }`}>
                        ${meta?.total_global_balance?.toLocaleString() || 0}
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs border-t border-gray-200 pt-2">
                    <span className="text-gray-500 font-bold uppercase text-[10px]">{t.wood_customers.actions.total_clients}</span>
                    <span className="font-mono font-bold text-black">{meta?.total_count || 0}</span>
                </div>
            </div>
        </div>
    );
}