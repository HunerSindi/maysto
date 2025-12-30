'use client';

import { useState, useEffect } from 'react';
import SimpleModal from '@/components/SimpleModal';
import { Transaction } from '@/types/personal';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ModalProps {
    isAddOpen: boolean;
    setIsAddOpen: (v: boolean) => void;
    isEditOpen: boolean;
    setIsEditOpen: (v: boolean) => void;
    isDeleteOpen: boolean;
    setIsDeleteOpen: (v: boolean) => void;
    formData: { amount: string; note: string };
    setFormData: (data: { amount: string; note: string }) => void;
    handleAdd: (e: React.FormEvent) => void;
    handleUpdate: (e: React.FormEvent) => void;
    handleDelete: () => void;
    selectedTx: Transaction | null;
}

export default function TransactionModals({
    isAddOpen, setIsAddOpen,
    isEditOpen, setIsEditOpen,
    isDeleteOpen, setIsDeleteOpen,
    formData, setFormData,
    handleAdd, handleUpdate, handleDelete, selectedTx
}: ModalProps) {
    const { t } = useLanguage();
    const [txType, setTxType] = useState<'credit' | 'debit'>('debit');

    useEffect(() => {
        const val = parseFloat(formData.amount);
        if (!isNaN(val) && val < 0) {
            setTxType('debit');
        } else if (!isNaN(val) && val >= 0) {
            setTxType('credit');
        }
    }, [isEditOpen, selectedTx]);

    const handleTypeChange = (type: 'credit' | 'debit') => {
        setTxType(type);
        const currentAbs = Math.abs(parseFloat(formData.amount) || 0);
        if (formData.amount === '') return;
        const newAmount = type === 'debit' ? -currentAbs : currentAbs;
        setFormData({ ...formData, amount: newAmount.toString() });
    };

    const handleAmountChange = (val: string) => {
        if (val === '') {
            setFormData({ ...formData, amount: '' });
            return;
        }
        const absVal = Math.abs(parseFloat(val));
        const finalVal = txType === 'debit' ? -absVal : absVal;
        setFormData({ ...formData, amount: finalVal.toString() });
    };

    const inputClass = "w-full h-9 border border-gray-400 px-2 text-sm focus:border-blue-600 outline-none rounded-sm transition-colors font-mono";
    const labelClass = "block text-[10px] font-bold uppercase text-gray-700 mb-1";
    const btnClass = "w-full h-9 text-xs font-bold uppercase shadow-sm border rounded-sm transition-colors flex items-center justify-center gap-2";

    const renderFormContent = (onSubmit: (e: React.FormEvent) => void, submitText: string, colorClass: string) => (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className={labelClass}>{t.personal_detail.modals.type}</label>
                <div className="flex gap-2">
                    <button type="button" onClick={() => handleTypeChange('credit')} className={`flex-1 h-9 border text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-2 transition-all ${txType === 'credit' ? 'bg-green-700 text-white border-green-900 ring-1 ring-green-700' : 'bg-gray-50 text-gray-500 border-gray-300 hover:bg-gray-100'}`}>
                        <ArrowUp size={14} /> {t.personal_detail.modals.credit}
                    </button>
                    <button type="button" onClick={() => handleTypeChange('debit')} className={`flex-1 h-9 border text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-2 transition-all ${txType === 'debit' ? 'bg-red-700 text-white border-red-900 ring-1 ring-red-700' : 'bg-gray-50 text-gray-500 border-gray-300 hover:bg-gray-100'}`}>
                        <ArrowDown size={14} /> {t.personal_detail.modals.debit}
                    </button>
                </div>
            </div>
            <div>
                <label className={labelClass}>{t.personal_detail.modals.amount}</label>
                <input type="number" step="0.01" min="0" className={inputClass} placeholder="0.00" value={formData.amount ? Math.abs(parseFloat(formData.amount)).toString() : ''} onChange={e => handleAmountChange(e.target.value)} autoFocus />
                <p className="text-[10px] text-gray-400 mt-1 uppercase text-right">{t.personal_detail.modals.stored_val} {formData.amount || '0'}</p>
            </div>
            <div>
                <label className={labelClass}>{t.personal_detail.modals.note}</label>
                <input type="text" className={inputClass} placeholder={t.personal_detail.modals.note_ph} value={formData.note} onChange={e => setFormData({ ...formData, note: e.target.value })} />
            </div>
            <button type="submit" className={colorClass}>{submitText}</button>
        </form>
    );

    return (
        <>
            <SimpleModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title={t.personal_detail.modals.add_title}>
                {renderFormContent(handleAdd, t.personal_detail.modals.save, `${btnClass} bg-blue-700 hover:bg-blue-800 text-white border-blue-900`)}
            </SimpleModal>
            <SimpleModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title={t.personal_detail.modals.edit_title}>
                {renderFormContent(handleUpdate, t.personal_detail.modals.update, `${btnClass} bg-amber-600 hover:bg-amber-700 text-white border-amber-800`)}
            </SimpleModal>
            <SimpleModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title={t.personal_detail.modals.delete_title}>
                <div className="space-y-4">
                    <p className="text-sm text-gray-700">{t.personal_detail.modals.delete_confirm} <strong className={`font-mono ml-1 ${selectedTx?.amount && selectedTx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>${selectedTx?.amount?.toLocaleString()}</strong>?</p>
                    <div className="flex gap-2">
                        <button onClick={() => setIsDeleteOpen(false)} className={`${btnClass} bg-gray-100 text-gray-700 border-gray-400 hover:bg-gray-200`}>{t.personal_detail.modals.cancel}</button>
                        <button onClick={handleDelete} className={`${btnClass} bg-red-700 text-white border-red-900 hover:bg-red-800`}>{t.personal_detail.modals.confirm_delete}</button>
                    </div>
                </div>
            </SimpleModal>
        </>
    );
}