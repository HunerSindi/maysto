'use client';

import SimpleModal from '@/components/SimpleModal';
import { WoodCustomer } from '@/types/wood';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ModalProps {
    isAddOpen: boolean; setIsAddOpen: (v: boolean) => void;
    isEditOpen: boolean; setIsEditOpen: (v: boolean) => void;
    isDeleteOpen: boolean; setIsDeleteOpen: (v: boolean) => void;
    formData: any; setFormData: (data: any) => void;
    handleAdd: (e: React.FormEvent) => void;
    handleUpdate: (e: React.FormEvent) => void;
    handleDelete: () => void;
    selectedCustomer: WoodCustomer | null;
    deleteCode: string;
    userDeleteInput: string;
    setUserDeleteInput: (v: string) => void;
}

export default function CustomerModals({
    isAddOpen, setIsAddOpen, isEditOpen, setIsEditOpen, isDeleteOpen, setIsDeleteOpen,
    formData, setFormData, handleAdd, handleUpdate, handleDelete, selectedCustomer,
    deleteCode, userDeleteInput, setUserDeleteInput
}: ModalProps) {
    const { t } = useLanguage();
    const handleChange = (field: string, value: string) => setFormData({ ...formData, [field]: value });
    const inputClass = "w-full h-9 border border-gray-400 px-2 text-sm focus:border-amber-600 outline-none rounded-sm transition-colors";
    const labelClass = "block text-[10px] font-bold uppercase text-gray-700 mb-1";
    const btnClass = "w-full h-9 text-xs font-bold uppercase shadow-sm border rounded-sm transition-colors flex items-center justify-center";

    return (
        <>
            {/* ADD MODAL */}
            <SimpleModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title={t.wood_customers.modals.titles.create}>
                <form onSubmit={handleAdd} className="space-y-3">
                    <div><label className={labelClass}>{t.wood_customers.modals.labels.name}</label><input required className={inputClass} value={formData.name} onChange={e => handleChange('name', e.target.value)} /></div>
                    <div className="flex gap-3">
                        <div className="flex-1"><label className={labelClass}>{t.wood_customers.modals.labels.phone}</label><input required className={inputClass} value={formData.phone} onChange={e => handleChange('phone', e.target.value)} /></div>
                        <div className="flex-1"><label className={labelClass}>{t.wood_customers.modals.labels.initial_balance}</label><input type="number" className={inputClass} value={formData.balance} onChange={e => handleChange('balance', e.target.value)} /></div>
                    </div>
                    <div><label className={labelClass}>{t.wood_customers.modals.labels.location}</label><input className={inputClass} value={formData.location} onChange={e => handleChange('location', e.target.value)} /></div>
                    <div><label className={labelClass}>{t.wood_customers.modals.labels.note}</label><textarea className="w-full border border-gray-400 p-2 text-sm focus:border-amber-600 outline-none rounded-sm min-h-[60px]" value={formData.note} onChange={e => handleChange('note', e.target.value)} /></div>
                    <button type="submit" className={`${btnClass} bg-amber-700 hover:bg-amber-800 text-white border-amber-900`}>{t.wood_customers.modals.buttons.create}</button>
                </form>
            </SimpleModal>

            {/* EDIT MODAL */}
            <SimpleModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title={t.wood_customers.modals.titles.edit}>
                <form onSubmit={handleUpdate} className="space-y-3">
                    <div><label className={labelClass}>{t.wood_customers.modals.labels.name}</label><input required className={inputClass} value={formData.name} onChange={e => handleChange('name', e.target.value)} /></div>
                    <div><label className={labelClass}>{t.wood_customers.modals.labels.phone}</label><input required className={inputClass} value={formData.phone} onChange={e => handleChange('phone', e.target.value)} /></div>
                    <div><label className={labelClass}>{t.wood_customers.modals.labels.location}</label><input className={inputClass} value={formData.location} onChange={e => handleChange('location', e.target.value)} /></div>
                    <div><label className={labelClass}>{t.wood_customers.modals.labels.note}</label><textarea className="w-full border border-gray-400 p-2 text-sm focus:border-amber-600 outline-none rounded-sm min-h-[60px]" value={formData.note} onChange={e => handleChange('note', e.target.value)} /></div>
                    <button type="submit" className={`${btnClass} bg-amber-600 hover:bg-amber-700 text-white border-amber-800`}>{t.wood_customers.modals.buttons.update}</button>
                </form>
            </SimpleModal>

            {/* DELETE MODAL */}
            <SimpleModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title={t.wood_customers.modals.titles.delete}>
                <div className="space-y-4">
                    <p className="text-sm text-gray-700">{t.wood_customers.modals.delete_text} <strong className="uppercase">{selectedCustomer?.name}</strong>? {t.wood_customers.modals.enter_code}</p>
                    <div className="text-center">
                        <div className="inline-block text-2xl font-mono font-bold bg-gray-100 px-4 py-1 border border-gray-300 mb-2">{deleteCode}</div>
                        <input type="text" className="w-full h-9 border border-gray-400 text-center font-bold tracking-widest" maxLength={4} value={userDeleteInput} onChange={e => setUserDeleteInput(e.target.value)} />
                    </div>
                    <button onClick={handleDelete} disabled={userDeleteInput !== deleteCode} className={`${btnClass} bg-red-700 text-white hover:bg-red-800 disabled:opacity-50`}>{t.wood_customers.modals.buttons.delete}</button>
                </div>
            </SimpleModal>
        </>
    );
}