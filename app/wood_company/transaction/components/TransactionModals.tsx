'use client';

import { useState } from 'react';
import SimpleModal from '@/components/SimpleModal';
import { WoodTransactionDashboard } from '@/types/wood';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ModalProps {
    isAdjustOpen: boolean; setIsAdjustOpen: (v: boolean) => void;
    isConfirmOpen: boolean; setIsConfirmOpen: (v: boolean) => void;
    onAdjustSubmit: (amount: number, type: 'add' | 'withdraw', note: string) => void;
    onConfirmSubmit: () => void;
    dashboardData: WoodTransactionDashboard | null;
}

export default function TransactionModals({
    isAdjustOpen, setIsAdjustOpen,
    isConfirmOpen, setIsConfirmOpen,
    onAdjustSubmit, onConfirmSubmit,
    dashboardData
}: ModalProps) {
    const { t } = useLanguage();
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [type, setType] = useState<'add' | 'withdraw'>('withdraw');

    const handleCloseAdjust = () => { setIsAdjustOpen(false); setAmount(''); setNote(''); };

    const handleAdjust = (e: React.FormEvent) => {
        e.preventDefault();
        onAdjustSubmit(parseFloat(amount), type, note);
        handleCloseAdjust();
    };

    const inputClass = "w-full h-9 border border-gray-400 px-2 text-sm focus:border-amber-600 outline-none rounded-sm transition-colors font-mono";
    const labelClass = "block text-[10px] font-bold uppercase text-gray-700 mb-1";

    const payments = dashboardData?.effective_payments || 0;
    const expenses = dashboardData?.active_expenses || 0;
    const takeouts = dashboardData?.active_takeouts || 0;
    const netFlow = dashboardData?.net_cash_flow || 0;

    return (
        <>
            {/* ADJUST MODAL */}
            <SimpleModal isOpen={isAdjustOpen} onClose={handleCloseAdjust} title={t.wood_transaction.modals.adjust_title}>
                <form onSubmit={handleAdjust} className="space-y-4">
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setType('withdraw')} className={`flex-1 h-10 border text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-2 ${type === 'withdraw' ? 'bg-red-700 text-white border-red-900' : 'bg-gray-50 border-gray-300 text-gray-500'}`}>
                            {t.wood_transaction.modals.withdraw_money}
                        </button>
                        <button type="button" onClick={() => setType('add')} className={`flex-1 h-10 border text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-2 ${type === 'add' ? 'bg-green-700 text-white border-green-900' : 'bg-gray-50 border-gray-300 text-gray-500'}`}>
                            {t.wood_transaction.modals.deposit_money}
                        </button>
                    </div>
                    <div>
                        <label className={labelClass}>{t.wood_transaction.modals.amount}</label>
                        <input required type="number" step="0.01" min="0" className={inputClass} value={amount} onChange={e => setAmount(e.target.value)} autoFocus placeholder="0.00" />
                    </div>
                    <div>
                        <label className={labelClass}>{t.wood_transaction.modals.reason}</label>
                        <input required type="text" className={inputClass} value={note} onChange={e => setNote(e.target.value)} placeholder={t.wood_transaction.modals.reason_ph} />
                    </div>
                    <button type="submit" className="w-full h-9 bg-amber-700 hover:bg-amber-800 text-white border border-amber-900 text-xs font-bold uppercase rounded-sm shadow-sm mt-2">
                        {type === 'withdraw' ? t.wood_transaction.modals.confirm_withdrawal : t.wood_transaction.modals.confirm_deposit}
                    </button>
                </form>
            </SimpleModal>

            {/* CONFIRM MODAL */}
            <SimpleModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title={t.wood_transaction.modals.close_title}>
                <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 p-3 text-xs text-yellow-800">
                        <strong className="uppercase">Warning:</strong> {t.wood_transaction.modals.warning}
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span>{t.wood_transaction.modals.in_payments}:</span>
                            <span className="font-mono font-bold text-green-700">+${payments.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span>{t.wood_transaction.modals.out_expenses}:</span>
                            <span className="font-mono font-bold text-red-700">-${expenses.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span>{t.wood_transaction.modals.out_takeouts}:</span>
                            <span className="font-mono font-bold text-purple-700">-${takeouts.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-black font-bold text-base">
                            <span>{t.wood_transaction.modals.net_flow}:</span>
                            <span className={`font-mono ${netFlow >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                                {netFlow >= 0 ? '+' : ''}{netFlow.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => { onConfirmSubmit(); setIsConfirmOpen(false); }}
                        className="w-full h-10 bg-green-700 hover:bg-green-800 text-white border border-green-900 text-xs font-bold uppercase rounded-sm shadow-sm mt-2"
                    >
                        {t.wood_transaction.modals.confirm_close}
                    </button>
                </div>
            </SimpleModal>
        </>
    );
}