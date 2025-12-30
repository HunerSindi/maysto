'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function CiramicHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useLanguage();

    // Define the navigation links
    const navItems = [
        { name: t.ceramic_header.nav.expenses, href: '/ciramic_company/expenses' },
        { name: t.ceramic_header.nav.sales, href: '/ciramic_company/sales' },
        { name: t.ceramic_header.nav.transactions, href: '/ciramic_company/transaction' },
        { name: t.ceramic_header.nav.takeout, href: '/ciramic_company/takeout' },
    ];

    return (
        <div className="bg-blue-600 h-[52px] p-3 flex justify-between items-center sticky top-0 z-30 shadow-md print:hidden">

            {/* LEFT: Back Button & Company Name */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.push("/")}
                    className="text-white font-bold hover:text-gray-200 uppercase text-sm flex items-center gap-2 transition-colors"
                >
                    {/* Added rtl:rotate-180 for Arabic/Kurdish arrow direction */}
                    <span className="text-lg pb-1 rtl:rotate-180">&larr;</span>
                    {t.ceramic_header.main_menu}
                </button>

                <div className="h-6 w-px bg-blue-400 hidden md:block"></div>

                <h1 className="font-bold text-white uppercase tracking-tight text-lg hidden md:block">
                    MAESTRO MERMER
                </h1>
            </div>

            {/* RIGHT: Module Label (Optional) */}
            <div className="text-xs text-blue-200 uppercase hidden md:block text-right">
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