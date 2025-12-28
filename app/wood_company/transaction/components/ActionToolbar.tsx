'use client';

import { Settings, CheckCircle } from 'lucide-react';

interface ToolbarProps {
    onAdjust: () => void;
    onConfirm: () => void;
}

export default function ActionToolbar({ onAdjust, onConfirm }: ToolbarProps) {
    return (
        <div className="bg-white border border-gray-400 p-3 mb-4 flex justify-between items-center shadow-sm print:hidden">
            <div className="text-xs font-bold uppercase text-gray-500">
                Store Operations
            </div>
            <div className="flex gap-3">
                <button
                    onClick={onAdjust}
                    className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 text-xs font-bold uppercase border border-gray-400 hover:bg-gray-200 transition shadow-sm rounded-sm"
                >
                    <Settings size={14} /> Adjust / Withdraw
                </button>
                <button
                    onClick={onConfirm}
                    className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 text-xs font-bold uppercase border border-amber-900 hover:bg-amber-800 transition shadow-sm rounded-sm"
                >
                    <CheckCircle size={14} /> Confirm & Close Period
                </button>
            </div>
        </div>
    );
}