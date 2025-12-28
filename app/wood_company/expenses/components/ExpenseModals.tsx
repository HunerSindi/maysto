'use client';

import SimpleModal from '@/components/SimpleModal';
import { Expense } from '@/types/wood';

interface ModalProps {
    isAddOpen: boolean; setIsAddOpen: (v: boolean) => void;
    isEditOpen: boolean; setIsEditOpen: (v: boolean) => void;
    isDeleteOpen: boolean; setIsDeleteOpen: (v: boolean) => void;
    formData: { category: string; amount: string; note: string };
    setFormData: (data: any) => void;
    handleAdd: (e: React.FormEvent) => void;
    handleUpdate: (e: React.FormEvent) => void;
    handleDelete: () => void;
    selectedExpense: Expense | null;
    deleteCode: string;
    userDeleteInput: string;
    setUserDeleteInput: (v: string) => void;
}

export default function ExpenseModals({
    isAddOpen, setIsAddOpen, isEditOpen, setIsEditOpen, isDeleteOpen, setIsDeleteOpen,
    formData, setFormData, handleAdd, handleUpdate, handleDelete, selectedExpense,
    deleteCode, userDeleteInput, setUserDeleteInput
}: ModalProps) {
    const handleChange = (field: string, value: string) => setFormData({ ...formData, [field]: value });
    const inputClass = "w-full h-9 border border-gray-400 px-2 text-sm focus:border-amber-600 outline-none rounded-sm transition-colors";
    const labelClass = "block text-[10px] font-bold uppercase text-gray-700 mb-1";
    const btnClass = "w-full h-9 text-xs font-bold uppercase shadow-sm border rounded-sm transition-colors flex items-center justify-center";

    const renderForm = (onSubmit: any, btnText: string, btnColor: string) => (
        <form onSubmit={onSubmit} className="space-y-3">
            <div>
                <label className={labelClass}>Category</label>
                <input required className={inputClass} value={formData.category} onChange={e => handleChange('category', e.target.value)} placeholder="e.g. Raw Materials" />
            </div>
            <div>
                <label className={labelClass}>Amount ($)</label>
                <input required type="number" step="0.01" className={inputClass} value={formData.amount} onChange={e => handleChange('amount', e.target.value)} placeholder="0.00" />
            </div>
            <div>
                <label className={labelClass}>Note</label>
                <textarea className="w-full border border-gray-400 p-2 text-sm focus:border-amber-600 outline-none rounded-sm min-h-[80px]" value={formData.note} onChange={e => handleChange('note', e.target.value)} placeholder="Details..." />
            </div>
            <button type="submit" className={`${btnClass} ${btnColor} text-white`}>{btnText}</button>
        </form>
    );

    return (
        <>
            <SimpleModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="New Expense">
                {renderForm(handleAdd, "Create Expense", "bg-amber-700 hover:bg-amber-800 border-amber-900")}
            </SimpleModal>

            <SimpleModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Expense">
                {renderForm(handleUpdate, "Update Expense", "bg-amber-600 hover:bg-amber-700 border-amber-800")}
            </SimpleModal>

            <SimpleModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Confirm Delete">
                <div className="space-y-4">
                    <p className="text-sm text-gray-700">Delete expense for <strong className="font-mono">${selectedExpense?.amount}</strong>? Enter code:</p>
                    <div className="text-center">
                        <div className="inline-block text-2xl font-mono font-bold bg-gray-100 px-4 py-1 border border-gray-300 mb-2">{deleteCode}</div>
                        <input type="text" className="w-full h-9 border border-gray-400 text-center font-bold tracking-widest" maxLength={4} value={userDeleteInput} onChange={e => setUserDeleteInput(e.target.value)} />
                    </div>
                    <button onClick={handleDelete} disabled={userDeleteInput !== deleteCode} className={`${btnClass} bg-red-700 text-white hover:bg-red-800 disabled:opacity-50`}>Confirm Delete</button>
                </div>
            </SimpleModal>
        </>
    );
}