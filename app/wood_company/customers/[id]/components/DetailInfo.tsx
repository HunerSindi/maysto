'use client';
import { WoodCustomer } from '@/types/wood';
import { User, Phone, MapPin, Wallet } from 'lucide-react';

export default function DetailInfo({ customer }: { customer: WoodCustomer }) {
    return (
        <div className="bg-white border border-gray-400 p-4 shadow-sm mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
                    <User className="text-amber-700" size={20} />
                    <h2 className="text-xl font-bold uppercase text-gray-800">{customer.name}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-gray-600 mt-2">
                    <div className="flex items-center gap-2"><Phone size={14} /> <span>{customer.phone}</span></div>
                    <div className="flex items-center gap-2"><MapPin size={14} /> <span>{customer.location || 'N/A'}</span></div>
                </div>
            </div>
            <div className="w-full md:w-64 text-right">
                <div className="flex items-center justify-end gap-2 mb-1"><Wallet size={16} className="text-gray-500" /><span className="text-[10px] font-bold uppercase text-gray-500">Current Balance</span></div>
                <div className={`text-3xl font-mono font-bold border-2 p-3 text-center bg-gray-50 rounded-sm ${customer.balance < 0 ? 'text-red-600 border-red-200' : 'text-green-700 border-green-200'}`}>${customer.balance.toLocaleString()}</div>
            </div>
        </div>
    );
}