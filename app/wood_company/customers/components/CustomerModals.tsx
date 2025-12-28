'use client';

import SimpleModal from '@/components/SimpleModal';
import { WoodCustomer } from '@/types/wood';

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
    const handleChange = (field: string, value: string) => setFormData({ ...formData, [field]: value });
    const inputClass = "w-full h-9 border border-gray-400 px-2 text-sm focus:border-amber-600 outline-none rounded-sm transition-colors";
    const labelClass = "block text-[10px] font-bold uppercase text-gray-700 mb-1";
    const btnClass = "w-full h-9 text-xs font-bold uppercase shadow-sm border rounded-sm transition-colors flex items-center justify-center";

    return (
        <>
            {/* ADD MODAL - Has Initial Balance */}
            <SimpleModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="New Customer">
                <form onSubmit={handleAdd} className="space-y-3">
                    <div><label className={labelClass}>Name</label><input required className={inputClass} value={formData.name} onChange={e => handleChange('name', e.target.value)} /></div>
                    <div className="flex gap-3">
                        <div className="flex-1"><label className={labelClass}>Phone</label><input required className={inputClass} value={formData.phone} onChange={e => handleChange('phone', e.target.value)} /></div>
                        <div className="flex-1"><label className={labelClass}>Initial Balance ($)</label><input type="number" className={inputClass} value={formData.balance} onChange={e => handleChange('balance', e.target.value)} /></div>
                    </div>
                    <div><label className={labelClass}>Location</label><input className={inputClass} value={formData.location} onChange={e => handleChange('location', e.target.value)} /></div>
                    <div><label className={labelClass}>Note</label><textarea className="w-full border border-gray-400 p-2 text-sm focus:border-amber-600 outline-none rounded-sm min-h-[60px]" value={formData.note} onChange={e => handleChange('note', e.target.value)} /></div>
                    <button type="submit" className={`${btnClass} bg-amber-700 hover:bg-amber-800 text-white border-amber-900`}>Create Customer</button>
                </form>
            </SimpleModal>

            {/* EDIT MODAL - No Balance Change (Use Adjust) */}
            <SimpleModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Details">
                <form onSubmit={handleUpdate} className="space-y-3">
                    <div><label className={labelClass}>Name</label><input required className={inputClass} value={formData.name} onChange={e => handleChange('name', e.target.value)} /></div>
                    <div><label className={labelClass}>Phone</label><input required className={inputClass} value={formData.phone} onChange={e => handleChange('phone', e.target.value)} /></div>
                    <div><label className={labelClass}>Location</label><input className={inputClass} value={formData.location} onChange={e => handleChange('location', e.target.value)} /></div>
                    <div><label className={labelClass}>Note</label><textarea className="w-full border border-gray-400 p-2 text-sm focus:border-amber-600 outline-none rounded-sm min-h-[60px]" value={formData.note} onChange={e => handleChange('note', e.target.value)} /></div>
                    <button type="submit" className={`${btnClass} bg-amber-600 hover:bg-amber-700 text-white border-amber-800`}>Update Customer</button>
                </form>
            </SimpleModal>

            {/* DELETE MODAL */}
            <SimpleModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Confirm Delete">
                <div className="space-y-4">
                    <p className="text-sm text-gray-700">Delete customer <strong className="uppercase">{selectedCustomer?.name}</strong>? Enter code:</p>
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