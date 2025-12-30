'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ChairHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useLanguage();

    const navItems = [
        { name: t.chair_header.nav.expenses, href: '/chair_company/expenses' },
        { name: t.chair_header.nav.sales, href: '/chair_company/sales' },
        { name: t.chair_header.nav.transactions, href: '/chair_company/transaction' },
        { name: t.chair_header.nav.takeout, href: '/chair_company/takeout' },
    ];

    return (
        <div className="bg-red-700 h-[52px] p-3 flex justify-between items-center sticky top-0 z-30 shadow-md print:hidden">

            {/* LEFT: Back & Title */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="text-white font-bold hover:text-gray-200 uppercase text-sm flex items-center gap-2 transition-colors"
                >
                    {/* Added rtl:rotate-180 for Arabic/Kurdish arrow direction */}
                    <span className="text-lg pb-1 rtl:rotate-180">&larr;</span>
                    {t.chair_header.main_menu}
                </button>
                <div className="h-6 w-px bg-red-400 hidden md:block"></div>
                <h1 className="font-bold text-white uppercase tracking-tight text-lg hidden md:block">
                    MAESTRO MOBILYA
                </h1>
            </div>

            {/* RIGHT: Navigation */}
            <div className="text-xs text-red-200 uppercase hidden md:block text-right">
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