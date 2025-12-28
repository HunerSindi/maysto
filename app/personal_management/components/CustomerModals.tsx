'use client';

import SimpleModal from '@/components/SimpleModal';
import { Customer } from '@/types/personal';

interface ModalsProps {
    isAddOpen: boolean;
    setIsAddOpen: (v: boolean) => void;
    isEditOpen: boolean;
    setIsEditOpen: (v: boolean) => void;
    isDeleteOpen: boolean;
    setIsDeleteOpen: (v: boolean) => void;
    formData: any;
    setFormData: (data: any) => void;
    handleAdd: (e: React.FormEvent) => void;
    handleUpdate: (e: React.FormEvent) => void;
    handleDelete: () => void;
    deleteCode: string;
    userDeleteInput: string;
    setUserDeleteInput: (v: string) => void;
    selectedCustomer: Customer | null;
}

export default function CustomerModals({
    isAddOpen, setIsAddOpen,
    isEditOpen, setIsEditOpen,
    isDeleteOpen, setIsDeleteOpen,
    formData, setFormData,
    handleAdd, handleUpdate, handleDelete,
    deleteCode, userDeleteInput, setUserDeleteInput, selectedCustomer
}: ModalsProps) {

    // Helper for input change
    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    // Common Input Styles
    const inputClass = "w-full h-9 border border-gray-400 px-2 text-sm focus:border-blue-600 outline-none rounded-sm transition-colors";
    const labelClass = "block text-[10px] font-bold uppercase text-gray-700 mb-1";
    const btnClass = "w-full h-9 text-xs font-bold uppercase shadow-sm border rounded-sm transition-colors flex items-center justify-center";

    return (
        <>
            {/* ADD MODAL */}
            <SimpleModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="New Customer Entry">
                <form onSubmit={handleAdd} className="space-y-3">
                    <div>
                        <label className={labelClass}>Customer Name <span className="text-red-500">*</span></label>
                        <input
                            required
                            className={inputClass}
                            value={formData.name}
                            onChange={e => handleChange('name', e.target.value)}
                            placeholder="FULL NAME"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                            <input
                                required
                                className={inputClass}
                                value={formData.phone}
                                onChange={e => handleChange('phone', e.target.value)}
                                placeholder="07xx xxx xxxx"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Location</label>
                            <input
                                className={inputClass}
                                value={formData.location}
                                onChange={e => handleChange('location', e.target.value)}
                                placeholder="CITY / AREA"
                            />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Note / Remarks</label>
                        <textarea
                            className="w-full border border-gray-400 p-2 text-sm focus:border-blue-600 outline-none rounded-sm min-h-20"
                            value={formData.note}
                            onChange={e => handleChange('note', e.target.value)}
                            placeholder="Optional notes..."
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className={`${btnClass} bg-red-700 hover:bg-red-800 text-white border-red-900`}
                        >
                            Save Customer
                        </button>
                    </div>
                </form>
            </SimpleModal>

            {/* EDIT MODAL */}
            <SimpleModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Customer Details">
                <form onSubmit={handleUpdate} className="space-y-3">
                    <div>
                        <label className={labelClass}>Customer Name <span className="text-red-500">*</span></label>
                        <input
                            required
                            className={inputClass}
                            value={formData.name}
                            onChange={e => handleChange('name', e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                            <input
                                required
                                className={inputClass}
                                value={formData.phone}
                                onChange={e => handleChange('phone', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Location</label>
                            <input
                                className={inputClass}
                                value={formData.location}
                                onChange={e => handleChange('location', e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label className={labelClass}>Note / Remarks</label>
                        <textarea
                            className="w-full border border-gray-400 p-2 text-sm focus:border-blue-600 outline-none rounded-sm min-h-20"
                            value={formData.note}
                            onChange={e => handleChange('note', e.target.value)}
                        />
                    </div>
                    <div className="pt-2">
                        <button
                            type="submit"
                            className={`${btnClass} bg-amber-600 hover:bg-amber-700 text-white border-amber-800`}
                        >
                            Update Changes
                        </button>
                    </div>
                </form>
            </SimpleModal>

            {/* DELETE MODAL */}
            <SimpleModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Confirm Deletion">
                <div className="space-y-4">
                    <div className="bg-red-50 p-3 border border-red-200 text-red-700 text-xs font-bold uppercase">
                        Warning: This action cannot be undone.
                    </div>

                    <div className="text-sm text-gray-700">
                        To delete customer <span className="font-bold">{selectedCustomer?.name}</span>, please enter the security code below:
                    </div>

                    <div className="text-center">
                        <div className="inline-block text-3xl font-mono font-bold text-gray-800 tracking-[0.5em] bg-gray-100 py-2 px-6 border border-gray-400 rounded-sm mb-3 select-none">
                            {deleteCode}
                        </div>

                        <input
                            type="text"
                            placeholder="ENTER 4-DIGIT CODE"
                            className="w-full h-10 border border-gray-400 p-2 rounded-sm text-center text-lg tracking-widest focus:border-red-600 outline-none font-bold"
                            value={userDeleteInput}
                            onChange={(e) => setUserDeleteInput(e.target.value)}
                            maxLength={4}
                        />
                    </div>

                    <button
                        onClick={handleDelete}
                        disabled={userDeleteInput !== deleteCode}
                        className={`${btnClass} bg-red-700 hover:bg-red-800 text-white border-red-900 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        Confirm Delete
                    </button>
                </div>
            </SimpleModal>
        </>
    );
}