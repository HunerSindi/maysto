'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { WoodTransactionDashboard, WoodHistoryResponse, WoodHistoryItem, WoodTransactionMeta } from '@/types/wood';
import { useLanguage } from "@/lib/i18n/LanguageContext";

import WoodHeader from '../components/WoodHeader';
import DashboardCards from './components/DashboardCards';
import ActionToolbar from './components/ActionToolbar';
import HistoryTable from './components/HistoryTable';
import TransactionModals from './components/TransactionModals';
import PrintTransaction from './components/PrintTransaction';

export default function WoodTransactionPage() {
    const { t } = useLanguage();
    const [dashboard, setDashboard] = useState<WoodTransactionDashboard | null>(null);
    const [history, setHistory] = useState<WoodHistoryItem[]>([]);
    const [meta, setMeta] = useState<WoodTransactionMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const [isAdjustOpen, setIsAdjustOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [dashRes, histRes] = await Promise.all([
                api.get<WoodTransactionDashboard>('/wood/transaction/dashboard'),
                api.get<WoodHistoryResponse>('/wood/transaction/history', { params: { page, limit: 10 } })
            ]);

            setDashboard(dashRes.data);
            setHistory(histRes.data.data || []);
            setMeta(histRes.data.meta);
        } catch (error) {
            console.error("Fetch error", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, [page]);

    const handleAdjust = async (amount: number, type: 'add' | 'withdraw', note: string) => {
        try {
            await api.post('/wood/transaction/adjust', { amount, type, note });
            fetchAll();
        } catch (error) { alert(t.wood_transaction.alerts.failed); }
    };

    const handleConfirm = async () => {
        try {
            await api.post('/wood/transaction/confirm');
            fetchAll();
        } catch (error) { alert(t.wood_transaction.alerts.close_failed); }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800">
            <WoodHeader />

            <div className="flex-1 overflow-hidden p-4 flex flex-col print:hidden">
                <DashboardCards data={dashboard} />
                <ActionToolbar
                    onAdjust={() => setIsAdjustOpen(true)}
                    onConfirm={() => setIsConfirmOpen(true)}
                    onPrint={() => window.print()}
                />
                <div className="flex-1 min-h-0">
                    <HistoryTable
                        data={history}
                        meta={meta}
                        loading={loading}
                        onPageChange={setPage}
                    />
                </div>
            </div>

            {/* Print Component (Hidden normally, shows on print) */}
            <PrintTransaction dashboard={dashboard} history={history} />

            <TransactionModals
                isAdjustOpen={isAdjustOpen} setIsAdjustOpen={setIsAdjustOpen}
                isConfirmOpen={isConfirmOpen} setIsConfirmOpen={setIsConfirmOpen}
                onAdjustSubmit={handleAdjust}
                onConfirmSubmit={handleConfirm}
                dashboardData={dashboard}
            />
        </div>
    );
}