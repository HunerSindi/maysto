// src/app/ciramic_company/transaction/page.tsx
'use client';

import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { TransactionDashboardData, HistoryResponse, TransactionHistoryItem, TransactionMeta } from '@/types/ciramic';

import CiramicHeader from '../expenses/components/CiramicHeader'; // Shared Header
import DashboardCards from './components/DashboardCards';
import ActionToolbar from './components/ActionToolbar';
import HistoryTable from './components/HistoryTable';
import TransactionModals from './components/TransactionModals';

export default function TransactionPage() {
    // Data State
    const [dashboard, setDashboard] = useState<TransactionDashboardData | null>(null);
    const [history, setHistory] = useState<TransactionHistoryItem[]>([]);
    const [meta, setMeta] = useState<TransactionMeta | null>(null);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [page, setPage] = useState(1);

    // Modal State
    const [isAdjustOpen, setIsAdjustOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // --- FETCH DATA ---
    const fetchAll = async () => {
        setLoading(true);
        try {
            // Parallel Fetch
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

    // Refetch when page changes
    useEffect(() => {
        fetchAll();
    }, [page]);

    // --- ACTIONS ---

    // 1. Adjust / Withdraw
    const handleAdjust = async (amount: number, type: 'add' | 'withdraw', note: string) => {
        try {
            await api.post('/cirmaci/transaction/adjust', { amount, type, note });
            fetchAll(); // Refresh data
        } catch (error) {
            alert('Operation failed');
        }
    };

    // 2. Confirm / Close Period
    const handleConfirm = async () => {
        try {
            await api.post('/cirmaci/transaction/confirm');
            fetchAll(); // Refresh data
        } catch (error) {
            alert('Failed to close period');
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800">
            {/* 1. Header */}
            <CiramicHeader />

            {/* 2. Main Layout */}
            <div className="flex-1 overflow-hidden p-4 flex flex-col">

                {/* Top: Dashboard Cards */}
                <DashboardCards data={dashboard} />

                {/* Middle: Actions */}
                <ActionToolbar
                    onAdjust={() => setIsAdjustOpen(true)}
                    onConfirm={() => setIsConfirmOpen(true)}
                />

                {/* Bottom: History Table */}
                <div className="flex-1 min-h-0">
                    <HistoryTable
                        data={history}
                        meta={meta}
                        loading={loading}
                        onPageChange={setPage}
                    />
                </div>
            </div>

            {/* 3. Modals */}
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