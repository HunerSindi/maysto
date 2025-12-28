'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ChairCompanyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname.startsWith(path);

    const tabs = [
        { name: 'Expenses', href: '/chair_company/expenses' },
        { name: 'Sales', href: '/chair_company/sales' },
        { name: 'Transactions', href: '/chair_company/transaction' },
    ];

    return (
        <div>
            {children}
        </div>
    );
}