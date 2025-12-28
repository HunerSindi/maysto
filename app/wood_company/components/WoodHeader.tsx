'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function WoodHeader() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { name: 'Expenses', href: '/wood_company/expenses' },
        { name: 'Sales', href: '/wood_company/sales' },
        { name: 'Customers', href: '/wood_company/customers' },
        { name: 'Transactions', href: '/wood_company/transaction' },
    ];

    return (
        <div className="bg-amber-800 h-[52px] p-3 flex justify-between items-center sticky top-0 z-30 shadow-md print:hidden">

            {/* LEFT: Back & Title */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="text-white font-bold hover:text-amber-200 uppercase text-sm flex items-center gap-2 transition-colors"
                >
                    <span className="text-lg pb-1">&larr;</span>
                    Main Menu
                </button>
                <div className="h-6 w-px bg-amber-500 hidden md:block"></div>
                <h1 className="font-bold text-white uppercase tracking-tight text-lg hidden md:block">
                    Wood Co.
                </h1>
            </div>

            {/* CENTER: Navigation */}


            {/* RIGHT: Label */}
            <div className="text-xs text-amber-200 font-mono uppercase hidden md:block text-right">
                <div className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                px-3 py-1.5 rounded-sm text-[10px] sm:text-xs font-bold uppercase transition-all border
                                ${isActive
                                        ? 'bg-amber-950 text-white border-amber-900 shadow-inner'
                                        : 'bg-transparent text-amber-100 border-transparent hover:bg-amber-700 hover:text-white'
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