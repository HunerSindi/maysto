'use client';
import { useRouter } from 'next/navigation';
import { Printer } from 'lucide-react';
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DetailHeader() {
    const router = useRouter();
    const { t } = useLanguage();

    return (
        <div className="bg-amber-800 h-[52px] p-3 flex justify-between items-center sticky top-0 z-30 shadow-md print:hidden">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/wood_company/customers")}
                    className="text-white font-bold uppercase text-sm flex items-center gap-2 hover:text-amber-200 transition-colors"
                >
                    {/* rtl:rotate-180 flips the arrow for Arabic/Kurdish */}
                    <span className="text-lg pb-1 rtl:rotate-180">&larr;</span>
                    {t.wood_customer_detail.header.back}
                </button>
                <div className="h-6 w-px bg-amber-500 hidden sm:block"></div>
                <h1 className="font-bold text-white uppercase text-lg">
                    {t.wood_customer_detail.header.title}
                </h1>
            </div>
            <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-amber-700 hover:bg-amber-900 text-white text-xs font-bold uppercase px-4 py-2 border border-amber-900 rounded-sm shadow-sm transition-colors"
            >
                <Printer size={16} />
                {t.wood_customer_detail.header.print}
            </button>
        </div>
    );
}