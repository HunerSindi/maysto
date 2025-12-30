'use client';
import { useState } from 'react';
import SimpleModal from '@/components/SimpleModal';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ModalProps {
    isOpen: boolean; onClose: () => void;
    onConfirm: (type: 'add' | 'reduce', amount: number, note: string) => void;
}

export default function AdjustModal({ isOpen, onClose, onConfirm }: ModalProps) {
    const { t } = useLanguage();
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [type, setType] = useState<'add' | 'reduce'>('reduce');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(type, parseFloat(amount), note);
        setAmount(''); setNote(''); onClose();
    };

    return (
        <SimpleModal isOpen={isOpen} onClose={onClose} title={t.wood_customer_detail.adjust_modal.title}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                    <button type="button" onClick={() => setType('add')} className={`flex-1 h-9 text-xs font-bold uppercase border rounded-sm ${type === 'add' ? 'bg-red-700 text-white border-red-900' : 'bg-gray-100'}`}>
                        {t.wood_customer_detail.adjust_modal.add_debt}
                    </button>
                    <button type="button" onClick={() => setType('reduce')} className={`flex-1 h-9 text-xs font-bold uppercase border rounded-sm ${type === 'reduce' ? 'bg-green-700 text-white border-green-900' : 'bg-gray-100'}`}>
                        {t.wood_customer_detail.adjust_modal.receive_payment}
                    </button>
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase mb-1">{t.wood_customer_detail.adjust_modal.amount}</label>
                    <input required type="number" step="0.01" className="w-full h-9 border border-gray-400 px-2 text-sm font-mono outline-none focus:border-amber-600 rounded-sm" value={amount} onChange={e => setAmount(e.target.value)} autoFocus />
                </div>
                <div>
                    <label className="block text-[10px] font-bold uppercase mb-1">{t.wood_customer_detail.adjust_modal.reason}</label>
                    <input required className="w-full h-9 border border-gray-400 px-2 text-sm outline-none focus:border-amber-600 rounded-sm" value={note} onChange={e => setNote(e.target.value)} placeholder={t.wood_customer_detail.adjust_modal.reason_ph} />
                </div>
                <button type="submit" className="w-full h-9 bg-amber-700 text-white font-bold uppercase text-xs border border-amber-900 rounded-sm hover:bg-amber-800 transition">
                    {t.wood_customer_detail.adjust_modal.confirm}
                </button>
            </form>
        </SimpleModal>
    );
}