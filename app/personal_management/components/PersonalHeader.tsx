'use client';

import { useRouter } from 'next/navigation';

export default function PersonalHeader() {
    const router = useRouter();
    const dir = 'ltr'; // Set to 'rtl' if needed

    return (
        <div className="bg-red-600 h-13 p-3 flex justify-between items-center sticky top-0 z-30 shadow-md print:hidden">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="text-white font-bold hover:text-black uppercase text-sm flex items-center gap-2 transition-colors"
                >
                    {/* Direction-aware Arrow */}
                    <span className="text-lg pb-1">
                        <>&larr;</>
                    </span>
                    Back
                </button>

                <div className="h-6 w-px bg-red-400"></div>

                <h1 className="font-bold text-white uppercase tracking-tight text-lg">
                    Personal Management
                </h1>
            </div>

            {/* Right side area (Empty or Version info) */}
            <div className="text-xs text-blue-200 font-mono uppercase">
                v1.0
            </div>
        </div>
    );
}