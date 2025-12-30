'use client';

import { WoodTransactionDashboard } from '@/types/wood';
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
    Wallet,
    Banknote,
    CheckCircle2,
    TrendingDown,
    LogOut,
    Scale
} from 'lucide-react';

export default function DashboardCards({ data }: { data: WoodTransactionDashboard | null }) {
    const { t } = useLanguage();

    if (!data) return <div className="h-48 bg-gray-100 animate-pulse border border-gray-300"></div>;

    const Card = ({ title, amount, icon: Icon, colorClass, borderClass }: any) => (
        <div className={`bg-white border ${borderClass} p-4 shadow-sm flex flex-col justify-between h-28`}>
            <div className="flex justify-between items-start">
                <h3 className="text-[10px] font-bold uppercase text-gray-600 tracking-wider">{title}</h3>
                <Icon size={18} className="text-gray-400" />
            </div>
            <div className={`text-2xl font-mono font-bold ${colorClass} mt-1`}>
                ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </div>
            <div className="h-1 w-full bg-gray-50 mt-auto overflow-hidden">
                <div className={`h-full ${colorClass.replace('text-', 'bg-')} opacity-20`}></div>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-4 print:hidden">

            {/* --- ROW 1 --- */}
            <Card
                title={t.wood_transaction.dashboard.store_balance}
                amount={data.store_balance}
                icon={Wallet}
                colorClass="text-amber-700"
                borderClass="border-amber-300"
            />
            <Card
                title={t.wood_transaction.dashboard.raw_payments}
                amount={data.raw_payments}
                icon={Banknote}
                colorClass="text-blue-600"
                borderClass="border-blue-200"
            />
            <Card
                title={t.wood_transaction.dashboard.effective_payments}
                amount={data.effective_payments}
                icon={CheckCircle2}
                colorClass="text-emerald-600"
                borderClass="border-emerald-200"
            />

            {/* --- ROW 2 --- */}
            <Card
                title={t.wood_transaction.dashboard.active_expenses}
                amount={data.active_expenses}
                icon={TrendingDown}
                colorClass="text-red-600"
                borderClass="border-red-200"
            />
            <Card
                title={t.wood_transaction.dashboard.active_takeouts}
                amount={data.active_takeouts}
                icon={LogOut}
                colorClass="text-purple-600"
                borderClass="border-purple-200"
            />
            <Card
                title={t.wood_transaction.dashboard.net_cash_flow}
                amount={data.net_cash_flow}
                icon={Scale}
                colorClass={data.net_cash_flow >= 0 ? "text-gray-900" : "text-red-700"}
                borderClass="border-gray-400"
            />
        </div>
    );
}