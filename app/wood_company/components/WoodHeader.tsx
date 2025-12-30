'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function WoodHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useLanguage();

    const navItems = [
        { name: t.wood_header.nav.expenses, href: '/wood_company/expenses' },
        { name: t.wood_header.nav.sales, href: '/wood_company/sales' },
        { name: t.wood_header.nav.customers, href: '/wood_company/customers' },
        { name: t.wood_header.nav.transactions, href: '/wood_company/transaction' },
        { name: t.wood_header.nav.takeout, href: '/wood_company/takeout' },
    ];

    return (
        <div className="bg-amber-800 h-[52px] p-3 flex justify-between items-center sticky top-0 z-30 shadow-md print:hidden">

            {/* LEFT: Back & Title */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="text-white font-bold hover:text-amber-200 uppercase text-sm flex items-center gap-2 transition-colors"
                >
                    {/* RTL Support: Rotates arrow for Arabic/Kurdish */}
                    <span className="text-lg pb-1 rtl:rotate-180">&larr;</span>
                    {t.wood_header.main_menu}
                </button>
                <div className="h-6 w-px bg-amber-500 hidden md:block"></div>
                <h1 className="font-bold text-white uppercase tracking-tight text-lg hidden md:block">
                    MAESTRO M.D.F
                </h1>
            </div>

            {/* RIGHT: Navigation Items */}
            <div className="text-xs text-amber-200 uppercase hidden md:block text-right">
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