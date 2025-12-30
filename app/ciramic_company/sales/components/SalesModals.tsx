'use client';

import SimpleModal from '@/components/SimpleModal';
import { Sale } from '@/types/ciramic';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ModalProps {
    isAddOpen: boolean; setIsAddOpen: (v: boolean) => void;
    isEditOpen: boolean; setIsEditOpen: (v: boolean) => void;
    isDeleteOpen: boolean; setIsDeleteOpen: (v: boolean) => void;
    formData: { amount: string; note: string };
    setFormData: (data: any) => void;
    handleAdd: (e: React.FormEvent) => void;
    handleUpdate: (e: React.FormEvent) => void;
    handleDelete: () => void;
    selectedSale: Sale | null;
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
    const handleChange = (field: string, value: string) => setFormData({ ...formData, [field]: value });
    const inputClass = "w-full h-9 border border-gray-400 px-2 text-sm focus:border-blue-600 outline-none rounded-sm transition-colors font-mono";
    const labelClass = "block text-[10px] font-bold uppercase text-gray-700 mb-1";
    const btnClass = "w-full h-9 text-xs font-bold uppercase shadow-sm border rounded-sm transition-colors flex items-center justify-center";

    const renderForm = (onSubmit: any, btnText: string, btnColor: string) => (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className={labelClass}>{t.ceramic_sales.modals.amount_label}</label>
                <input required type="number" step="0.01" className={inputClass} value={formData.amount} onChange={e => handleChange('amount', e.target.value)} placeholder="0.00" autoFocus />
            </div>
            <div>
                <label className={labelClass}>{t.ceramic_sales.modals.note_label}</label>
                <textarea className="w-full border border-gray-400 p-2 text-sm focus:border-blue-600 outline-none rounded-sm min-h-[80px]" value={formData.note} onChange={e => handleChange('note', e.target.value)} placeholder={t.ceramic_sales.modals.note_ph} />
            </div>
            <button type="submit" className={`${btnClass} ${btnColor} text-white`}>{btnText}</button>
        </form>
    );

    return (
        <>
            <SimpleModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title={t.ceramic_sales.modals.new_title}>
                {renderForm(handleAdd, t.ceramic_sales.modals.btn_create, "bg-blue-700 hover:bg-blue-800 border-blue-900")}
            </SimpleModal>

            <SimpleModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title={t.ceramic_sales.modals.edit_title}>
                {renderForm(handleUpdate, t.ceramic_sales.modals.btn_update, "bg-amber-600 hover:bg-amber-700 border-amber-800")}
            </SimpleModal>

            <SimpleModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title={t.ceramic_sales.modals.delete_title}>
                <div className="space-y-4">
                    <p className="text-sm text-gray-700">{t.ceramic_sales.modals.delete_text} <strong className="font-mono text-blue-700">${selectedSale?.amount}</strong>? {t.ceramic_sales.modals.enter_code}</p>
                    <div className="text-center">
                        <div className="inline-block text-2xl font-mono font-bold bg-gray-100 px-4 py-1 border border-gray-300 mb-2">{deleteCode}</div>
                        <input type="text" className="w-full h-9 border border-gray-400 text-center font-bold tracking-widest" maxLength={4} value={userDeleteInput} onChange={e => setUserDeleteInput(e.target.value)} />
                    </div>
                    <button onClick={handleDelete} disabled={userDeleteInput !== deleteCode} className={`${btnClass} bg-red-700 text-white hover:bg-red-800 disabled:opacity-50`}>{t.ceramic_sales.modals.btn_delete}</button>
                </div>
            </SimpleModal>
        </>
    );
}