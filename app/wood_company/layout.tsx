'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function WoodCompanyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const isActive = (path: string) => pathname.startsWith(path);

    const tabs = [
        { name: 'Expenses', href: '/wood_company/expenses' },
        { name: 'Sales', href: '/wood_company/sales' },
        { name: 'Customers', href: '/wood_company/customers' },
        { name: 'Transactions', href: '/wood_company/transaction' },
    ];

    return (
        <div>
            {children}
        </div>
    );
}