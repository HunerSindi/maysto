'use client';

import { WoodTransactionDashboard } from '@/types/wood';
import { Wallet, TrendingUp, TrendingDown, Scale } from 'lucide-react';

export default function DashboardCards({ data }: { data: WoodTransactionDashboard | null }) {
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
            {/* 1. Store Balance */}
            <Card
                title="Wood Store Balance"
                amount={data.store_balance}
                icon={Wallet}
                colorClass="text-amber-700"
                borderClass="border-amber-300"
            />

            {/* 2. Active Sales */}
            <Card
                title="Pending Sales"
                amount={data.active_sales}
                icon={TrendingUp}
                colorClass="text-green-600"
                borderClass="border-gray-300"
            />

            {/* 3. Active Expenses */}
            <Card
                title="Pending Expenses"
                amount={data.active_expenses}
                icon={TrendingDown}
                colorClass="text-red-600"
                borderClass="border-gray-300"
            />

            {/* 4. Net Profit */}
            <Card
                title="Projected Profit"
                amount={data.net_profit}
                icon={Scale}
                colorClass={data.net_profit >= 0 ? "text-green-700" : "text-red-700"}
                borderClass={data.net_profit >= 0 ? "border-green-200" : "border-red-200"}
            />
        </div>
    );
}