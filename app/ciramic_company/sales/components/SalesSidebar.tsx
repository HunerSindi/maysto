'use client';

import { Plus, Printer, TrendingUp } from 'lucide-react';
import { SaleMeta } from '@/types/ciramic';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface SidebarProps {
    meta: SaleMeta | null;
    onAddClick: () => void;
}

export default function SalesSidebar({ meta, onAddClick }: SidebarProps) {
    const { t } = useLanguage();
    const handlePrint = () => window.print();

    return (
        <div className="space-y-3 print:hidden">
            {/* Actions */}
            <div className="bg-white border border-gray-400 p-3 shadow-sm">
                <h3 className="text-[10px] font-bold uppercase text-gray-500 mb-2 border-b border-gray-300 pb-1">
                    {t.ceramic_sales.actions.title}
                </h3>
                <button
                    onClick={onAddClick}
                    className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white h-9 hover:bg-blue-800 transition mb-2 shadow-sm border border-blue-900 text-xs font-bold uppercase rounded-sm"
                >
                    <Plus size={14} /> {t.ceramic_sales.actions.new_sale}
                </button>
                <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-700 border border-gray-400 h-9 hover:bg-gray-200 transition text-xs font-bold uppercase rounded-sm"
                >
                    <Printer size={14} /> {t.ceramic_sales.actions.print}
                </button>
            </div>

            {/* Financials */}
            <div className="bg-white border border-gray-400 p-3 shadow-sm">
                <h3 className="text-[10px] font-bold uppercase text-gray-500 mb-2 border-b border-gray-300 pb-1">
                    {t.ceramic_sales.actions.income_summary}
                </h3>

                <div className="mb-3">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <TrendingUp size={14} />
                        <span className="text-[10px] uppercase font-bold text-gray-600">{t.ceramic_sales.actions.total_revenue}</span>
                    </div>
                    {/* Blue Text for Income */}
                    <div className="text-xl font-mono font-bold border border-blue-300 p-2 text-center bg-blue-50 rounded-sm text-blue-800">
                        ${meta?.total_sales?.toLocaleString() || 0}
                    </div>
                </div>

                <div className="flex justify-between items-center text-xs border-t border-gray-200 pt-2">
                    <span className="text-gray-500 font-bold uppercase text-[10px]">{t.ceramic_sales.actions.page_total}</span>
                    <span className="font-mono font-bold text-black">${meta?.current_page_balance?.toLocaleString() || 0}</span>
                </div>
            </div>
        </div>
    );
}