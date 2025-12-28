'use client';

import { useState, useEffect } from 'react';
import SimpleModal from '@/components/SimpleModal';
import { Transaction } from '@/types/personal';
import { ArrowDown, ArrowUp } from 'lucide-react';

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

    // Local state to track which button is active
    const [txType, setTxType] = useState<'credit' | 'debit'>('debit');

    // Sync type when Edit Modal opens or formData changes
    useEffect(() => {
        const val = parseFloat(formData.amount);
        if (!isNaN(val) && val < 0) {
            setTxType('debit');
        } else if (!isNaN(val) && val >= 0) {
            setTxType('credit');
        }
        // Default to debit for empty form if it's a new add, or keep existing
    }, [isEditOpen, selectedTx]);

    // --- LOGIC HANDLERS ---

    // 1. When user clicks Credit/Debit buttons
    const handleTypeChange = (type: 'credit' | 'debit') => {
        setTxType(type);
        const currentAbs = Math.abs(parseFloat(formData.amount) || 0);

        // If input is empty, just update type state
        if (formData.amount === '') return;

        // Apply sign based on type
        const newAmount = type === 'debit' ? -currentAbs : currentAbs;
        setFormData({ ...formData, amount: newAmount.toString() });
    };

    // 2. When user types in the input (Always treat as positive visual, store with sign)
    const handleAmountChange = (val: string) => {
        // If empty
        if (val === '') {
            setFormData({ ...formData, amount: '' });
            return;
        }

        const absVal = Math.abs(parseFloat(val));
        const finalVal = txType === 'debit' ? -absVal : absVal;

        setFormData({ ...formData, amount: finalVal.toString() });
    };

    // --- STYLES ---
    const inputClass = "w-full h-9 border border-gray-400 px-2 text-sm focus:border-blue-600 outline-none rounded-sm transition-colors font-mono";
    const labelClass = "block text-[10px] font-bold uppercase text-gray-700 mb-1";
    const btnClass = "w-full h-9 text-xs font-bold uppercase shadow-sm border rounded-sm transition-colors flex items-center justify-center gap-2";

    // Helper to render the form content (Shared between Add/Edit)
    const renderFormContent = (onSubmit: (e: React.FormEvent) => void, submitText: string, colorClass: string) => (
        <form onSubmit={onSubmit} className="space-y-4">

            {/* TYPE SELECTION BUTTONS */}
            <div>
                <label className={labelClass}>Transaction Type</label>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => handleTypeChange('credit')}
                        className={`flex-1 h-9 border text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-2 transition-all
                        ${txType === 'credit'
                                ? 'bg-green-700 text-white border-green-900 ring-1 ring-green-700'
                                : 'bg-gray-50 text-gray-500 border-gray-300 hover:bg-gray-100'}`}
                    >
                        <ArrowUp size={14} /> Credit (Pay)
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTypeChange('debit')}
                        className={`flex-1 h-9 border text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-2 transition-all
                        ${txType === 'debit'
                                ? 'bg-red-700 text-white border-red-900 ring-1 ring-red-700'
                                : 'bg-gray-50 text-gray-500 border-gray-300 hover:bg-gray-100'}`}
                    >
                        <ArrowDown size={14} /> Debit (Debt)
                    </button>
                </div>
            </div>

            {/* AMOUNT INPUT */}
            <div>
                <label className={labelClass}>Amount ($)</label>
                <input
                    type="number"
                    step="0.01"
                    min="0" // HTML constraint to suggest positive numbers
                    className={inputClass}
                    placeholder="0.00"
                    // Display Absolute Value so user sees "500" even if it's "-500"
                    value={formData.amount ? Math.abs(parseFloat(formData.amount)).toString() : ''}
                    onChange={e => handleAmountChange(e.target.value)}
                    autoFocus
                />
                <p className="text-[10px] text-gray-400 mt-1 uppercase text-right">
                    Stored Value: {formData.amount || '0'}
                </p>
            </div>

            {/* NOTE INPUT */}
            <div>
                <label className={labelClass}>Note / Description</label>
                <input
                    type="text"
                    className={inputClass}
                    placeholder="Reason..."
                    value={formData.note}
                    onChange={e => setFormData({ ...formData, note: e.target.value })}
                />
            </div>

            <button type="submit" className={colorClass}>
                {submitText}
            </button>
        </form>
    );

    return (
        <>
            {/* ADD MODAL */}
            <SimpleModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Transaction">
                {renderFormContent(
                    handleAdd,
                    "Save Transaction",
                    `${btnClass} bg-blue-700 hover:bg-blue-800 text-white border-blue-900`
                )}
            </SimpleModal>

            {/* EDIT MODAL */}
            <SimpleModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Transaction">
                {renderFormContent(
                    handleUpdate,
                    "Update Changes",
                    `${btnClass} bg-amber-600 hover:bg-amber-700 text-white border-amber-800`
                )}
            </SimpleModal>

            {/* DELETE MODAL */}
            <SimpleModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Transaction">
                <div className="space-y-4">
                    <p className="text-sm text-gray-700">
                        Are you sure you want to delete this transaction amount of
                        <strong className={`font-mono ml-1 ${selectedTx?.amount && selectedTx.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ${selectedTx?.amount?.toLocaleString()}
                        </strong>?
                    </p>
                    <div className="flex gap-2">
                        <button onClick={() => setIsDeleteOpen(false)} className={`${btnClass} bg-gray-100 text-gray-700 border-gray-400 hover:bg-gray-200`}>
                            Cancel
                        </button>
                        <button onClick={handleDelete} className={`${btnClass} bg-red-700 text-white border-red-900 hover:bg-red-800`}>
                            Confirm Delete
                        </button>
                    </div>
                </div>
            </SimpleModal>
        </>
    );
}