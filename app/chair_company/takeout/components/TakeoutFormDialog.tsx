"use client";
import { useState, useEffect } from "react";
import { ChairTakeout } from "@/lib/api/chair-takeout";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Props {
    isOpen: boolean; onClose: () => void; onSubmit: (data: ChairTakeout) => Promise<void>;
    initialData?: ChairTakeout | null; isEditing: boolean;
}

export default function TakeoutFormDialog({ isOpen, onClose, onSubmit, initialData, isEditing }: Props) {
    const { t } = useLanguage();
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && initialData) {
            setAmount(initialData.amount.toString());
            setNote(initialData.note);
        } else {
            setAmount(""); setNote("");
        }
    }, [isOpen, initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit({ amount: parseFloat(amount), note });
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white border-2 border-gray-600 w-full max-w-sm flex flex-col shadow-lg">
                <div className="bg-gray-200 border-b border-gray-400 p-2 flex justify-between items-center">
                    <h2 className="font-bold text-sm uppercase text-gray-800">
                        {isEditing ? t.chair_takeout.form.edit_title : t.chair_takeout.form.create_title}
                    </h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-red-600 font-bold px-2">X</button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 bg-gray-50 flex flex-col gap-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">{t.chair_takeout.form.amount}</label>
                        <input autoFocus type="number" step="0.01" required value={amount} onChange={e => setAmount(e.target.value)} className="w-full border border-gray-400 p-2 text-lg font-mono outline-none focus:border-blue-600 rounded-sm" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-600 mb-1">{t.chair_takeout.form.note}</label>
                        <textarea required value={note} onChange={e => setNote(e.target.value)} className="w-full border border-gray-400 p-2 text-sm outline-none focus:border-blue-600 rounded-sm" rows={3} />
                    </div>
                    <div className="flex gap-2 border-t border-gray-300 pt-3">
                        <button type="button" onClick={onClose} className="flex-1 bg-white border border-gray-400 py-2 text-xs font-bold uppercase hover:bg-gray-200 rounded-sm">{t.chair_takeout.form.cancel}</button>
                        <button type="submit" disabled={loading} className="flex-1 bg-blue-700 border border-blue-800 py-2 text-xs font-bold uppercase text-white hover:bg-blue-800 disabled:opacity-50 rounded-sm">{t.chair_takeout.form.save}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}