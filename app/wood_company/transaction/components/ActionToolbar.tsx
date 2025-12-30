'use client';

import { Settings, CheckCircle, Printer } from 'lucide-react';
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ToolbarProps {
    onAdjust: () => void;
    onConfirm: () => void;
    onPrint: () => void;
}

export default function ActionToolbar({ onAdjust, onConfirm, onPrint }: ToolbarProps) {
    const { t } = useLanguage();

    return (
        <div className="bg-white border border-gray-400 p-3 mb-4 flex flex-col sm:flex-row gap-3 justify-between items-center shadow-sm print:hidden">
            <div className="text-xs font-bold uppercase text-gray-500 w-full sm:w-auto text-center sm:text-start">
                {t.wood_transaction.toolbar.title}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
                <button
                    onClick={onAdjust}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 text-xs font-bold uppercase border border-gray-400 hover:bg-gray-200 transition shadow-sm rounded-sm"
                >
                    <Settings size={14} /> {t.wood_transaction.toolbar.adjust}
                </button>
                <button
                    onClick={onConfirm}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-amber-700 text-white px-4 py-2 text-xs font-bold uppercase border border-amber-900 hover:bg-amber-800 transition shadow-sm rounded-sm"
                >
                    <CheckCircle size={14} /> {t.wood_transaction.toolbar.confirm}
                </button>
                <button
                    onClick={onPrint}
                    className="flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 text-xs font-bold uppercase border border-black hover:bg-gray-900 transition shadow-sm rounded-sm"
                >
                    <Printer size={14} />
                </button>
            </div>
        </div>
    );
}