'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { TransactionDashboardData, HistoryResponse, TransactionHistoryItem, TransactionMeta } from '@/types/ciramic';
import { useLanguage } from "@/lib/i18n/LanguageContext";

import CiramicHeader from '../components/CiramicHeader';
import DashboardCards from './components/DashboardCards';
import ActionToolbar from './components/ActionToolbar';
import HistoryTable from './components/HistoryTable';
import TransactionModals from './components/TransactionModals';

export default function TransactionPage() {
    const { t } = useLanguage();
    const [dashboard, setDashboard] = useState<TransactionDashboardData | null>(null);
    const [history, setHistory] = useState<TransactionHistoryItem[]>([]);
    const [meta, setMeta] = useState<TransactionMeta | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const [isAdjustOpen, setIsAdjustOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [dashRes, histRes] = await Promise.all([
                api.get<TransactionDashboardData>('/cirmaci/transaction/dashboard'),
                api.get<HistoryResponse>('/cirmaci/transaction/history', { params: { page, limit: 10 } })
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
            await api.post('/cirmaci/transaction/adjust', { amount, type, note });
            fetchAll();
        } catch (error) { alert(t.ceramic_transaction.alerts.failed); }
    };

    const handleConfirm = async () => {
        try {
            await api.post('/cirmaci/transaction/confirm');
            fetchAll();
        } catch (error) { alert(t.ceramic_transaction.alerts.close_failed); }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800">
            <CiramicHeader />

            <div className="flex-1 overflow-hidden p-4 flex flex-col">
                <DashboardCards data={dashboard} />
                <ActionToolbar
                    onAdjust={() => setIsAdjustOpen(true)}
                    onConfirm={() => setIsConfirmOpen(true)}
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