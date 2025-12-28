// src/app/personal_management/[id]/components/CustomerDetailHeader.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Printer } from 'lucide-react';

export default function CustomerDetailHeader() {
    const router = useRouter();

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
                    <span className="text-lg pb-1">&larr;</span>
                    Back to List
                </button>

                <div className="h-6 w-px bg-red-400"></div>

                <h1 className="font-bold text-white uppercase tracking-tight text-lg">
                    Customer Statement
                </h1>
            </div>

            <button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase px-4 py-2 border border-red-900 transition-colors shadow-sm "
            >
                <Printer size={16} /> Print Statement
            </button>
        </div>
    );
}