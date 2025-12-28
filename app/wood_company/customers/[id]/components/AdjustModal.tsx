'use client';
import { useState } from 'react';
import SimpleModal from '@/components/SimpleModal';

interface ModalProps {
    isOpen: boolean; onClose: () => void;
    onConfirm: (type: 'add' | 'reduce', amount: number, note: string) => void;
}

export default function AdjustModal({ isOpen, onClose, onConfirm }: ModalProps) {
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [type, setType] = useState<'add' | 'reduce'>('reduce'); // Default: Reduce (Pay)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm(type, parseFloat(amount), note);
        setAmount(''); setNote(''); onClose();
    };

    return (
        <SimpleModal isOpen={isOpen} onClose={onClose} title="Adjust Balance">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                    <button type="button" onClick={() => setType('add')} className={`flex-1 h-9 text-xs font-bold uppercase border rounded-sm ${type === 'add' ? 'bg-red-700 text-white border-red-900' : 'bg-gray-100'}`}>Add Debt (+)</button>
                    <button type="button" onClick={() => setType('reduce')} className={`flex-1 h-9 text-xs font-bold uppercase border rounded-sm ${type === 'reduce' ? 'bg-green-700 text-white border-green-900' : 'bg-gray-100'}`}>Recieve Payment (-)</button>
                </div>
                <div><label className="block text-[10px] font-bold uppercase mb-1">Amount ($)</label><input required type="number" step="0.01" className="w-full h-9 border border-gray-400 px-2 text-sm font-mono" value={amount} onChange={e => setAmount(e.target.value)} autoFocus /></div>
                <div><label className="block text-[10px] font-bold uppercase mb-1">Reason</label><input required className="w-full h-9 border border-gray-400 px-2 text-sm" value={note} onChange={e => setNote(e.target.value)} placeholder="e.g. Cash Payment" /></div>
                <button type="submit" className="w-full h-9 bg-amber-700 text-white font-bold uppercase text-xs border border-amber-900 rounded-sm">Confirm Adjustment</button>
            </form>
        </SimpleModal>
    );
}