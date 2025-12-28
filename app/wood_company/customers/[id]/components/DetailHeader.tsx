'use client';
import { useRouter } from 'next/navigation';
import { Printer } from 'lucide-react';

export default function DetailHeader() {
    const router = useRouter();
    return (
        <div className="bg-amber-800 h-[52px] p-3 flex justify-between items-center sticky top-0 z-30 shadow-md print:hidden">
            <div className="flex items-center gap-4">
                <button onClick={() => router.push("/wood_company/customers")} className="text-white font-bold uppercase text-sm flex items-center gap-2 hover:text-amber-200"><span>&larr;</span> Back</button>
                <div className="h-6 w-px bg-amber-500"></div>
                <h1 className="font-bold text-white uppercase text-lg">Customer Account</h1>
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-amber-700 hover:bg-amber-900 text-white text-xs font-bold uppercase px-4 py-2 border border-amber-900 rounded-sm shadow-sm"><Printer size={16} /> Print</button>
        </div>
    );
}