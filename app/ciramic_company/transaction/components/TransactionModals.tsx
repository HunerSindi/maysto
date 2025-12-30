'use client';

import { useState } from 'react';
import SimpleModal from '@/components/SimpleModal';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ModalProps {
    isAdjustOpen: boolean; setIsAdjustOpen: (v: boolean) => void;
    isConfirmOpen: boolean; setIsConfirmOpen: (v: boolean) => void;
    onAdjustSubmit: (amount: number, type: 'add' | 'withdraw', note: string) => void;
    onConfirmSubmit: () => void;
    dashboardData: any;
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

    const inputClass = "w-full h-9 border border-gray-400 px-2 text-sm focus:border-blue-600 outline-none rounded-sm transition-colors font-mono";
    const labelClass = "block text-[10px] font-bold uppercase text-gray-700 mb-1";

    return (
        <>
            {/* ADJUST MODAL */}
            <SimpleModal isOpen={isAdjustOpen} onClose={handleCloseAdjust} title={t.ceramic_transaction.modals.adjust_title}>
                <form onSubmit={handleAdjust} className="space-y-4">
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setType('withdraw')} className={`flex-1 h-10 border text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-2 ${type === 'withdraw' ? 'bg-red-700 text-white border-red-900' : 'bg-gray-50 border-gray-300 text-gray-500'}`}>
                            {t.ceramic_transaction.modals.withdraw}
                        </button>
                        <button type="button" onClick={() => setType('add')} className={`flex-1 h-10 border text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-2 ${type === 'add' ? 'bg-green-700 text-white border-green-900' : 'bg-gray-50 border-gray-300 text-gray-500'}`}>
                            {t.ceramic_transaction.modals.deposit}
                        </button>
                    </div>
                    <div>
                        <label className={labelClass}>{t.ceramic_transaction.modals.amount}</label>
                        <input required type="number" step="0.01" min="0" className={inputClass} value={amount} onChange={e => setAmount(e.target.value)} autoFocus placeholder="0.00" />
                    </div>
                    <div>
                        <label className={labelClass}>{t.ceramic_transaction.modals.reason}</label>
                        <input required type="text" className={inputClass} value={note} onChange={e => setNote(e.target.value)} placeholder={t.ceramic_transaction.modals.reason_ph} />
                    </div>
                    <button type="submit" className="w-full h-9 bg-blue-700 hover:bg-blue-800 text-white border border-blue-900 text-xs font-bold uppercase rounded-sm shadow-sm mt-2">
                        {type === 'withdraw' ? t.ceramic_transaction.modals.confirm_withdraw : t.ceramic_transaction.modals.confirm_deposit}
                    </button>
                </form>
            </SimpleModal>

            {/* CONFIRM MODAL */}
            <SimpleModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title={t.ceramic_transaction.modals.close_title}>
                <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 p-3 text-xs text-yellow-800">
                        <strong className="uppercase">Warning:</strong> {t.ceramic_transaction.modals.warning}
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span>{t.ceramic_transaction.modals.pending_sales_in}</span>
                            <span className="font-mono font-bold text-green-700">+${dashboardData?.active_sales?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 pb-1">
                            <span>{t.ceramic_transaction.modals.pending_expenses_out}</span>
                            <span className="font-mono font-bold text-red-700">-${dashboardData?.active_expenses?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-1 font-bold">
                            <span>{t.ceramic_transaction.modals.net_change}</span>
                            <span className={`font-mono ${(dashboardData?.net_profit || 0) >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
                                {dashboardData?.net_profit >= 0 ? '+' : ''}{dashboardData?.net_profit?.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => { onConfirmSubmit(); setIsConfirmOpen(false); }}
                        className="w-full h-10 bg-green-700 hover:bg-green-800 text-white border border-green-900 text-xs font-bold uppercase rounded-sm shadow-sm"
                    >
                        {t.ceramic_transaction.modals.confirm_close}
                    </button>
                </div>
            </SimpleModal>
        </>
    );
}