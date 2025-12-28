'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function ChairHeader() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { name: 'Expenses', href: '/chair_company/expenses' },
        { name: 'Sales', href: '/chair_company/sales' },
        { name: 'Transactions', href: '/chair_company/transaction' },
    ];

    return (
        <div className="bg-red-700 h-[52px] p-3 flex justify-between items-center sticky top-0 z-30 shadow-md print:hidden">

            {/* LEFT: Back & Title */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="text-white font-bold hover:text-gray-200 uppercase text-sm flex items-center gap-2 transition-colors"
                >
                    <span className="text-lg pb-1">&larr;</span>
                    Main Menu
                </button>
                <div className="h-6 w-px bg-red-400 hidden md:block"></div>
                <h1 className="font-bold text-white uppercase tracking-tight text-lg hidden md:block">
                    Chair Co.
                </h1>
            </div>



            {/* RIGHT: Label */}
            <div className="text-xs text-red-200 font-mono uppercase hidden md:block text-right">
                {/* CENTER: Navigation */}
                <div className="flex items-center gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                px-4 py-1.5 rounded-sm text-xs font-bold uppercase transition-all border
                                ${isActive
                                        ? 'bg-red-900 text-white border-red-950 shadow-inner'
                                        : 'bg-transparent text-red-100 border-transparent hover:bg-red-600 hover:text-white'
                                    }
                            `}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}