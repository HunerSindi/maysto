'use client';

import { useState, useEffect } from 'react';
import SimpleModal from '@/components/SimpleModal';
import { Expense } from '@/types/wood';
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Plus, X, Settings } from 'lucide-react';

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
    const { t } = useLanguage();

    // --- Category Management State ---
    const [savedCategories, setSavedCategories] = useState<string[]>([]);
    const [newCatInput, setNewCatInput] = useState('');
    const [isManagingCats, setIsManagingCats] = useState(false); // Toggle for Edit Mode

    // Load from local storage
    useEffect(() => {
        const stored = localStorage.getItem('wood_expense_categories');
        if (stored) {
            setSavedCategories(JSON.parse(stored));
        } else {
            setSavedCategories(['Wood', 'Transport', 'Food', 'Salary', 'Maintenance']);
        }
    }, []);

    const addCategory = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!newCatInput.trim()) return;
        const updated = [...savedCategories, newCatInput.trim()];
        setSavedCategories(updated);
        localStorage.setItem('wood_expense_categories', JSON.stringify(updated));
        setNewCatInput('');
    };

    const removeCategory = (e: React.MouseEvent, catToRemove: string) => {
        e.preventDefault();
        const updated = savedCategories.filter(c => c !== catToRemove);
        setSavedCategories(updated);
        localStorage.setItem('wood_expense_categories', JSON.stringify(updated));
    };

    // Reset management mode when modal closes
    const closeAll = () => {
        setIsManagingCats(false);
        setIsAddOpen(false);
        setIsEditOpen(false);
        setIsDeleteOpen(false);
    };

    const handleChange = (field: string, value: string) => setFormData({ ...formData, [field]: value });

    // Styles
    const inputClass = "w-full h-9 border border-gray-400 px-2 text-sm focus:border-amber-600 outline-none rounded-sm transition-colors";
    const labelClass = "text-[10px] font-bold uppercase text-gray-700";
    const btnClass = "w-full h-9 text-xs font-bold uppercase shadow-sm border rounded-sm transition-colors flex items-center justify-center";

    const renderForm = (onSubmit: any, btnText: string, btnColor: string) => (
        <form onSubmit={onSubmit} className="space-y-3">

            {/* --- Category Section --- */}
            <div>
                <div className="flex justify-between items-end mb-1">
                    <label className={labelClass}>{t.wood_expenses.modals.labels.category}</label>
                    <button
                        type="button"
                        onClick={() => setIsManagingCats(!isManagingCats)}
                        className={`flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm border transition-colors ${isManagingCats ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200'}`}
                    >
                        <Settings size={10} />
                        {isManagingCats ? 'Done' : 'Edit Tags'}
                    </button>
                </div>

                {/* Tags Container */}
                <div className={`mb-2 bg-gray-50 p-2 border rounded-sm transition-colors ${isManagingCats ? 'border-amber-300 ring-1 ring-amber-100' : 'border-gray-200'}`}>

                    {/* List of Tags */}
                    <div className="flex flex-wrap gap-2">
                        {savedCategories.map((cat) => (
                            <div
                                key={cat}
                                onClick={() => !isManagingCats && handleChange('category', cat)}
                                className={`
                                    text-[10px] uppercase font-bold px-2 py-1 rounded-sm border flex items-center gap-1 transition-all select-none
                                    ${isManagingCats
                                        ? 'bg-white border-gray-300 cursor-default text-gray-500' // Edit Mode Style
                                        : formData.category === cat
                                            ? 'bg-amber-600 text-white border-amber-800 shadow-sm cursor-pointer' // Selected Style
                                            : 'bg-white text-gray-600 border-gray-300 hover:border-amber-500 hover:text-amber-600 cursor-pointer' // Default Style
                                    }
                                `}
                            >
                                {cat}
                                {/* Delete Button - Only visible in Manage Mode */}
                                {isManagingCats && (
                                    <button
                                        onClick={(e) => removeCategory(e, cat)}
                                        className="bg-red-100 hover:bg-red-500 hover:text-white text-red-600 rounded-full p-0.5 ml-1 transition-colors border border-red-200"
                                        title="Delete Tag"
                                    >
                                        <X size={10} />
                                    </button>
                                )}
                            </div>
                        ))}
                        {savedCategories.length === 0 && !isManagingCats && (
                            <span className="text-[10px] text-gray-400 italic">No tags. Click "Edit Tags" to add.</span>
                        )}
                    </div>

                    {/* Add New Input - Only visible in Manage Mode */}
                    {isManagingCats && (
                        <div className="flex gap-1 mt-3 border-t border-gray-200 pt-2 animate-in fade-in slide-in-from-top-1">
                            <input
                                type="text"
                                value={newCatInput}
                                onChange={(e) => setNewCatInput(e.target.value)}
                                placeholder="New category name..."
                                className="h-7 text-xs border border-gray-300 px-2 w-full rounded-sm outline-none focus:border-amber-500 bg-white"
                                autoFocus
                            />
                            <button
                                onClick={addCategory}
                                className="h-7 px-3 flex items-center justify-center bg-green-600 text-white hover:bg-green-700 border border-green-800 rounded-sm transition-colors text-[10px] font-bold uppercase"
                            >
                                <Plus size={14} className="mr-1" /> Add
                            </button>
                        </div>
                    )}
                </div>

                <input
                    required
                    className={inputClass}
                    value={formData.category}
                    onChange={e => handleChange('category', e.target.value)}
                    placeholder={t.wood_expenses.modals.labels.category_ph}
                />
            </div>

            {/* --- Amount --- */}
            <div>
                <label className={`${labelClass} block mb-1`}>{t.wood_expenses.modals.labels.amount}</label>
                <input required type="number" step="0.01" className={inputClass} value={formData.amount} onChange={e => handleChange('amount', e.target.value)} placeholder="0.00" />
            </div>

            {/* --- Note --- */}
            <div>
                <label className={`${labelClass} block mb-1`}>{t.wood_expenses.modals.labels.note}</label>
                <textarea className="w-full border border-gray-400 p-2 text-sm focus:border-amber-600 outline-none rounded-sm min-h-[80px]" value={formData.note} onChange={e => handleChange('note', e.target.value)} placeholder={t.wood_expenses.modals.labels.note_ph} />
            </div>

            <button type="submit" className={`${btnClass} ${btnColor} text-white`}>{btnText}</button>
        </form>
    );

    return (
        <>
            <SimpleModal isOpen={isAddOpen} onClose={closeAll} title={t.wood_expenses.modals.new_title}>
                {renderForm(handleAdd, t.wood_expenses.modals.buttons.create, "bg-amber-700 hover:bg-amber-800 border-amber-900")}
            </SimpleModal>

            <SimpleModal isOpen={isEditOpen} onClose={closeAll} title={t.wood_expenses.modals.edit_title}>
                {renderForm(handleUpdate, t.wood_expenses.modals.buttons.update, "bg-amber-600 hover:bg-amber-700 border-amber-800")}
            </SimpleModal>

            <SimpleModal isOpen={isDeleteOpen} onClose={closeAll} title={t.wood_expenses.modals.delete_title}>
                <div className="space-y-4">
                    <p className="text-sm text-gray-700">
                        {t.wood_expenses.modals.delete_text} <strong className="font-mono">${selectedExpense?.amount}</strong>? {t.wood_expenses.modals.enter_code}
                    </p>
                    <div className="text-center">
                        <div className="inline-block text-2xl font-mono font-bold bg-gray-100 px-4 py-1 border border-gray-300 mb-2">{deleteCode}</div>
                        <input type="text" className="w-full h-9 border border-gray-400 text-center font-bold tracking-widest" maxLength={4} value={userDeleteInput} onChange={e => setUserDeleteInput(e.target.value)} />
                    </div>
                    <button onClick={handleDelete} disabled={userDeleteInput !== deleteCode} className={`${btnClass} bg-red-700 text-white hover:bg-red-800 disabled:opacity-50`}>{t.wood_expenses.modals.buttons.confirm_delete}</button>
                </div>
            </SimpleModal>
        </>
    );
}