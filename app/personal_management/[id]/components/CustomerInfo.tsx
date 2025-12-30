'use client';

import { Customer } from '@/types/personal';
import { User, Phone, MapPin, Wallet } from 'lucide-react';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface InfoProps {
    customer: Customer;
}

export default function CustomerInfo({ customer }: InfoProps) {
    const { t } = useLanguage();

    return (
        <div className="bg-white border border-gray-400 p-4 shadow-sm mb-4 flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Left: Basic Info */}
            <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
                    <User className="text-blue-600" size={20} />
                    <h2 className="text-xl font-bold uppercase text-gray-800 tracking-tight">
                        {customer.name}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-gray-600 mt-2">
                    <div className="flex items-center gap-2">
                        <Phone size={14} />
                        <span className="uppercase">{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span className="uppercase">{customer.location || t.personal_detail.info.no_location}</span>
                    </div>
                </div>

                {customer.note && (
                    <div className="bg-yellow-50 border border-yellow-200 p-2 text-[10px] text-gray-700 mt-2 italic">
                        {t.personal_detail.info.note_prefix} {customer.note}
                    </div>
                )}
            </div>

            {/* Right: Balance Display */}
            <div className="w-full md:w-64">
                <div className="flex items-center gap-2 mb-1 justify-end rtl:justify-start">
                    <Wallet size={16} className="text-gray-500" />
                    <span className="text-[10px] font-bold uppercase text-gray-500">{t.personal_detail.info.current_balance}</span>
                </div>
                <div className={`text-3xl font-mono font-bold border-2 p-3 text-center shadow-inner
                    ${customer.balance < 0 ? 'text-red-600 border-red-200' : 'text-green-700 border-green-400'}
                `}>
                    ${customer.balance.toLocaleString()}
                </div>
                <div className="text-[10px] text-right rtl:text-left text-gray-400 mt-1 uppercase font-bold">
                    {t.personal_detail.info.id_prefix} {customer.id}
                </div>
            </div>
        </div>
    );
}