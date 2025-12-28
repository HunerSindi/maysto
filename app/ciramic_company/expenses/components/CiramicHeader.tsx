'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function CiramicHeader() {
    const router = useRouter();
    const pathname = usePathname();

    // Define the navigation links
    const navItems = [
        { name: 'Expenses', href: '/ciramic_company/expenses' },
        { name: 'Sales', href: '/ciramic_company/sales' },
        { name: 'Transactions', href: '/ciramic_company/transaction' },
    ];

    return (
        <div className="bg-blue-600 h-[52px] p-3 flex justify-between items-center sticky top-0 z-30 shadow-md print:hidden">

            {/* LEFT: Back Button & Company Name */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="text-white font-bold hover:text-gray-200 uppercase text-sm flex items-center gap-2 transition-colors"
                >
                    <span className="text-lg pb-1">&larr;</span>
                    Main Menu
                </button>

                <div className="h-6 w-px bg-blue-400 hidden md:block"></div>

                <h1 className="font-bold text-white uppercase tracking-tight text-lg hidden md:block">
                    Ceramic Co.
                </h1>
            </div>

            {/* CENTER: Navigation Links (Tabs) */}


            {/* RIGHT: Module Label (Optional) */}
            <div className="text-xs text-blue-200 font-mono uppercase hidden md:block text-right">
                <div className="flex items-center gap-2">
                    {navItems.map((item) => {
                        // Check if this tab is active
                        const isActive = pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                px-4 py-1.5 rounded-sm text-xs font-bold uppercase transition-all border
                                ${isActive
                                        ? 'bg-blue-800 text-white border-blue-900 shadow-inner'
                                        : 'bg-transparent text-blue-100 border-transparent hover:bg-blue-500 hover:text-white'
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