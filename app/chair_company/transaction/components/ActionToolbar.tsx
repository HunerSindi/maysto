'use client';

import { Settings, CheckCircle } from 'lucide-react';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ToolbarProps {
    onAdjust: () => void;
    onConfirm: () => void;
}

export default function ActionToolbar({ onAdjust, onConfirm }: ToolbarProps) {
    const { t } = useLanguage();

    return (
        <div className="bg-white border border-gray-400 p-3 mb-4 flex justify-between items-center shadow-sm print:hidden">
            <div className="text-xs font-bold uppercase text-gray-500">
                {t.chair_transaction.toolbar.title}
            </div>
            <div className="flex gap-3">
                <button
                    onClick={onAdjust}
                    className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 text-xs font-bold uppercase border border-gray-400 hover:bg-gray-200 transition shadow-sm rounded-sm"
                >
                    <Settings size={14} /> {t.chair_transaction.toolbar.adjust}
                </button>
                <button
                    onClick={onConfirm}
                    className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 text-xs font-bold uppercase border border-red-900 hover:bg-red-800 transition shadow-sm rounded-sm"
                >
                    <CheckCircle size={14} /> {t.chair_transaction.toolbar.confirm}
                </button>
            </div>
        </div>
    );
}