'use client';

import { TransactionDashboardData } from '@/types/ciramic';
import { Wallet, TrendingUp, TrendingDown, Scale } from 'lucide-react';
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DashboardCards({ data }: { data: TransactionDashboardData | null }) {
    const { t } = useLanguage();

    if (!data) return <div className="h-24 bg-gray-100 animate-pulse border border-gray-300"></div>;

    const Card = ({ title, amount, icon: Icon, colorClass, borderClass }: any) => (
        <div className={`bg-white border ${borderClass} p-4 shadow-sm flex flex-col justify-between h-32`}>
            <div className="flex justify-between items-start">
                <h3 className="text-[10px] font-bold uppercase text-gray-600 tracking-wider">{title}</h3>
                <Icon size={18} className="text-gray-400" />
            </div>
            <div className={`text-2xl font-mono font-bold ${colorClass} mt-2`}>
                ${amount.toLocaleString()}
            </div>
            <div className="h-1 w-full bg-gray-100 mt-auto overflow-hidden">
                <div className={`h-full ${colorClass.replace('text-', 'bg-')} opacity-20`}></div>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 print:hidden">
            <Card
                title={t.ceramic_transaction.dashboard.store_balance}
                amount={data.store_balance}
                icon={Wallet}
                colorClass="text-blue-700"
                borderClass="border-blue-300"
            />
            <Card
                title={t.ceramic_transaction.dashboard.pending_sales}
                amount={data.active_sales}
                icon={TrendingUp}
                colorClass="text-green-600"
                borderClass="border-gray-300"
            />
            <Card
                title={t.ceramic_transaction.dashboard.pending_expenses}
                amount={data.active_expenses}
                icon={TrendingDown}
                colorClass="text-red-600"
                borderClass="border-gray-300"
            />
            <Card
                title={t.ceramic_transaction.dashboard.projected_profit}
                amount={data.net_profit}
                icon={Scale}
                colorClass={data.net_profit >= 0 ? "text-green-700" : "text-red-700"}
                borderClass={data.net_profit >= 0 ? "border-green-200" : "border-red-200"}
            />
        </div>
    );
}