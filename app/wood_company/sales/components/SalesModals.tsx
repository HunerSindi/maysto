'use client';

import { useState, useEffect } from 'react';
import SimpleModal from '@/components/SimpleModal';
import { WoodSale, WoodCustomer } from '@/types/wood';
import api from '@/utils/api';
import { Search, UserCheck } from 'lucide-react';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ModalProps {
    isAddOpen: boolean; setIsAddOpen: (v: boolean) => void;
    isEditOpen: boolean; setIsEditOpen: (v: boolean) => void;
    isDeleteOpen: boolean; setIsDeleteOpen: (v: boolean) => void;

    formData: { customer_id: number; amount: string; note: string };
    setFormData: (data: any) => void;

    handleAdd: (e: React.FormEvent) => void;
    handleUpdate: (e: React.FormEvent) => void;
    handleDelete: () => void;

    selectedSale: WoodSale | null;
    deleteCode: string;
    userDeleteInput: string;
    setUserDeleteInput: (v: string) => void;
}

export default function SalesModals({
    isAddOpen, setIsAddOpen, isEditOpen, setIsEditOpen, isDeleteOpen, setIsDeleteOpen,
    formData, setFormData, handleAdd, handleUpdate, handleDelete, selectedSale,
    deleteCode, userDeleteInput, setUserDeleteInput
}: ModalProps) {
    const { t } = useLanguage();

    // --- CUSTOMER SEARCH STATE ---
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<WoodCustomer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<WoodCustomer | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    // Search Customers Effect
    useEffect(() => {
        const t = setTimeout(async () => {
            if (searchTerm.length > 1) {
                setIsSearching(true);
                try {
                    const res = await api.get(`/wood/customers?search=${searchTerm}&limit=5`);
                    setSearchResults(res.data.data || []);
                } catch (e) { setSearchResults([]); }
                finally { setIsSearching(false); }
            } else {
                setSearchResults([]);
            }
        }, 300);
        return () => clearTimeout(t);
    }, [searchTerm]);

    // Handle Customer Selection
    const selectCustomer = (c: WoodCustomer) => {
        setSelectedCustomer(c);
        setFormData({ ...formData, customer_id: c.id });
        setSearchTerm('');
        setSearchResults([]);
    };

    // Helper for input change
    const handleChange = (field: string, value: string) => setFormData({ ...formData, [field]: value });

    // Styles
    const inputClass = "w-full h-9 border border-gray-400 px-2 text-sm focus:border-green-600 outline-none rounded-sm transition-colors font-mono";
    const labelClass = "block text-[10px] font-bold uppercase text-gray-700 mb-1";
    const btnClass = "w-full h-9 text-xs font-bold uppercase shadow-sm border rounded-sm transition-colors flex items-center justify-center";

    // --- ADD SALE FORM ---
    const renderAddForm = () => (
        <form onSubmit={handleAdd} className="space-y-4">

            {/* Step 1: Select Customer */}
            <div className="bg-gray-50 border border-gray-300 p-3 rounded-sm">
                <label className={labelClass}>{t.wood_sales.modals.labels.select_customer}</label>

                {!selectedCustomer ? (
                    <div className="relative">
                        <div className="flex items-center border border-gray-400 bg-white px-2">
                            <Search size={14} className="text-gray-400 mr-2" />
                            <input
                                type="text"
                                className="w-full h-9 text-sm outline-none"
                                placeholder={t.wood_sales.modals.labels.search_ph}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>

                        {/* Dropdown Results */}
                        {searchResults.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-400 shadow-lg z-10 max-h-40 overflow-auto">
                                {searchResults.map(c => (
                                    <div key={c.id} onClick={() => selectCustomer(c)} className="p-2 hover:bg-green-50 cursor-pointer border-b border-gray-100 flex justify-between">
                                        <span className="font-bold text-sm">{c.name}</span>
                                        <span className="text-xs text-gray-500">{c.phone}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {isSearching && <div className="text-[10px] text-gray-500 mt-1">{t.wood_sales.modals.labels.searching}</div>}
                    </div>
                ) : (
                    <div className="flex justify-between items-center bg-green-50 border border-green-200 p-2">
                        <div className="flex items-center gap-2">
                            <UserCheck size={16} className="text-green-700" />
                            <div>
                                <div className="text-sm font-bold text-green-900">{selectedCustomer.name}</div>
                                <div className="text-[10px] text-green-700">{selectedCustomer.phone}</div>
                            </div>
                        </div>
                        <button type="button" onClick={() => { setSelectedCustomer(null); setFormData({ ...formData, customer_id: 0 }); }} className="text-[10px] uppercase text-red-600 font-bold hover:underline">{t.wood_sales.modals.labels.change}</button>
                    </div>
                )}
            </div>

            {/* Step 2: Sale Details (Only enabled if customer selected) */}
            <div className={!selectedCustomer ? 'opacity-50 pointer-events-none' : ''}>
                <div className="mb-3">
                    <label className={labelClass}>{t.wood_sales.modals.labels.amount}</label>
                    <input required type="number" step="0.01" className={inputClass} value={formData.amount} onChange={e => handleChange('amount', e.target.value)} placeholder="0.00" />
                </div>
                <div className="mb-3">
                    <label className={labelClass}>{t.wood_sales.modals.labels.note}</label>
                    <textarea className="w-full border border-gray-400 p-2 text-sm focus:border-green-600 outline-none rounded-sm min-h-[80px]" value={formData.note} onChange={e => handleChange('note', e.target.value)} placeholder={t.wood_sales.modals.labels.note_ph} />
                </div>
                <button type="submit" disabled={!selectedCustomer} className={`${btnClass} bg-green-700 hover:bg-green-800 text-white border-green-900 disabled:opacity-50`}>
                    {t.wood_sales.modals.buttons.confirm_sale}
                </button>
            </div>
        </form>
    );

    // --- EDIT FORM (Simplified, no customer change) ---
    const renderEditForm = () => (
        <form onSubmit={handleUpdate} className="space-y-4">
            <div className="bg-gray-100 p-2 border border-gray-300 text-xs text-gray-600 italic mb-2">
                {t.wood_sales.modals.warnings.customer_lock}
            </div>
            <div>
                <label className={labelClass}>{t.wood_sales.modals.labels.amount}</label>
                <input required type="number" step="0.01" className={inputClass} value={formData.amount} onChange={e => handleChange('amount', e.target.value)} />
            </div>
            <div>
                <label className={labelClass}>{t.wood_sales.modals.labels.note}</label>
                <textarea className="w-full border border-gray-400 p-2 text-sm focus:border-green-600 outline-none rounded-sm min-h-[80px]" value={formData.note} onChange={e => handleChange('note', e.target.value)} />
            </div>
            <button type="submit" className={`${btnClass} bg-amber-600 hover:bg-amber-700 text-white border-amber-800`}>{t.wood_sales.modals.buttons.update}</button>
        </form>
    );

    return (
        <>
            <SimpleModal isOpen={isAddOpen} onClose={() => { setIsAddOpen(false); setSelectedCustomer(null); }} title={t.wood_sales.modals.titles.create}>
                {renderAddForm()}
            </SimpleModal>

            <SimpleModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title={t.wood_sales.modals.titles.edit}>
                {renderEditForm()}
            </SimpleModal>

            <SimpleModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title={t.wood_sales.modals.titles.delete}>
                <div className="space-y-4">
                    <p className="text-sm text-gray-700">{t.wood_sales.modals.warnings.delete_text} <strong className="font-mono text-green-700">${selectedSale?.amount}</strong>? {t.wood_sales.modals.warnings.enter_code}</p>
                    <div className="text-center">
                        <div className="inline-block text-2xl font-mono font-bold bg-gray-100 px-4 py-1 border border-gray-300 mb-2">{deleteCode}</div>
                        <input type="text" className="w-full h-9 border border-gray-400 text-center font-bold tracking-widest" maxLength={4} value={userDeleteInput} onChange={e => setUserDeleteInput(e.target.value)} />
                    </div>
                    <button onClick={handleDelete} disabled={userDeleteInput !== deleteCode} className={`${btnClass} bg-red-700 text-white hover:bg-red-800 disabled:opacity-50`}>{t.wood_sales.modals.buttons.delete}</button>
                </div>
            </SimpleModal>
        </>
    );
}