'use client';

import { useRouter } from 'next/navigation';
import { Printer } from 'lucide-react';
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CustomerDetailHeader() {
    const router = useRouter();
    const { t } = useLanguage();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-red-600 h-[52px] p-3 flex justify-between items-center sticky top-0 z-30 shadow-md print:hidden">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/personal_management")}
                    className="text-white font-bold hover:text-black uppercase text-sm flex items-center gap-2 transition-colors"
                >
                    <span className="text-lg pb-1 rtl:rotate-180">&larr;</span>
                    {t.personal_detail.header.back}
                </button>

                <div className="h-6 w-px bg-red-400"></div>

                <h1 className="font-bold text-white uppercase tracking-tight text-lg">
                    {t.personal_detail.header.title}
                </h1>
            </div>

            <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase px-4 py-2 border border-red-900 transition-colors shadow-sm "
            >
                <Printer size={16} /> {t.personal_detail.header.print}
            </button>
        </div>
    );
}