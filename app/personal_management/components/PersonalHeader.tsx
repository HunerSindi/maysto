'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PersonalHeader() {
    const router = useRouter();
    const { t } = useLanguage();

    return (
        <div className="bg-red-600 h-13 p-3 flex justify-between items-center sticky top-0 z-30 shadow-md print:hidden">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="text-white font-bold hover:text-black uppercase text-sm flex items-center gap-2 transition-colors"
                >
                    {/* RTL Support: Rotates arrow */}
                    <span className="text-lg pb-1 rtl:rotate-180">
                        <>&larr;</>
                    </span>
                    {t.personal.header.back}
                </button>

                <div className="h-6 w-px bg-red-400"></div>

                <h1 className="font-bold text-white uppercase tracking-tight text-lg">
                    {t.personal.header.title}
                </h1>
            </div>

            <div className="text-xs text-blue-200 font-mono uppercase">
                v1.0
            </div>
        </div>
    );
}