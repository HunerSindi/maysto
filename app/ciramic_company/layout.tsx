'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CiramicCompanyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname.startsWith(path);

    const tabs = [
        { name: 'Expenses', href: '/ciramic_company/expenses' },
        { name: 'Sales', href: '/ciramic_company/sales' },
        { name: 'Transactions', href: '/ciramic_company/transaction' },
    ];

    return (
        <div>
            {children}
        </div>
    );
}