'use client';

import { use, useEffect, useState } from 'react';
import api from '@/utils/api';
import { WoodCustomer, WoodTransaction, WoodCustomerDetailResponse } from '@/types/wood';

import DetailHeader from './components/DetailHeader';
import DetailInfo from './components/DetailInfo';
import DetailTransactions from './components/DetailTransactions';
import AdjustModal from './components/AdjustModal';
import PrintDetail from './components/PrintDetail';

export default function WoodCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [customer, setCustomer] = useState<WoodCustomer | null>(null);
    const [transactions, setTransactions] = useState<WoodTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdjustOpen, setIsAdjustOpen] = useState(false);

    const fetchDetails = async () => {
        try {
            const res = await api.get<WoodCustomerDetailResponse>(`/wood/customers/${id}`);
            setCustomer(res.data.customer);
            // Safety check for transactions array
            setTransactions(res.data.transactions || []);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchDetails(); }, [id]);

    const handleAdjust = async (type: 'add' | 'reduce', amount: number, note: string) => {
        try {
            await api.post(`/wood/customers/${id}/adjust`, { type, amount, note });
            fetchDetails();
        } catch (e) { alert('Adjustment Failed'); }
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-bold uppercase text-gray-500">Loading...</div>;
    if (!customer) return <div className="h-screen flex items-center justify-center font-bold uppercase text-red-500">Not Found</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <DetailHeader />
            <div className="flex-1 flex flex-col p-4 overflow-hidden print:hidden">
                <DetailInfo customer={customer} />
                <div className="flex-1 min-h-0">
                    <DetailTransactions transactions={transactions} onAdjust={() => setIsAdjustOpen(true)} />
                </div>
            </div>
            <PrintDetail customer={customer} transactions={transactions} />
            <AdjustModal isOpen={isAdjustOpen} onClose={() => setIsAdjustOpen(false)} onConfirm={handleAdjust} />
        </div>
    );
}