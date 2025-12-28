// src/app/ciramic_company/components/PrintExpenses.tsx
'use client';

import { Expense, ExpenseMeta } from '@/types/ciramic';

export default function PrintExpenses({ data, meta }: { data: Expense[], meta: ExpenseMeta | null }) {
    return (
        <div className="hidden print:block absolute top-0 left-0 w-full bg-white z-[9999] p-0 m-0">
            <table className="w-full border-collapse font-sans text-black">
                <thead>
                    <tr><th colSpan={5} className="w-full pb-4"><img src="/print/header.png" className="w-full h-auto max-h-[150px]" /></th></tr>
                    <tr className="border border-black bg-gray-100">
                        <th className="text-center text-[10px] uppercase p-2 border-r border-black w-12">#</th>
                        <th className="text-left text-[10px] uppercase p-2 border-r border-black w-32">Date</th>
                        <th className="text-left text-[10px] uppercase p-2 border-r border-black">Category / Note</th>
                        <th className="text-right text-[10px] uppercase p-2 border-r border-black w-32">Amount</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr className="border border-black font-bold bg-gray-50">
                        <td colSpan={3} className="text-right p-2 text-xs uppercase border-r border-black">Total Expenses:</td>
                        <td className="text-right p-2 text-xs font-mono">${meta?.total_expenses.toLocaleString()}</td>
                    </tr>
                </tfoot>
                <tbody className="text-[10px]">
                    {data.map((item, idx) => (
                        <tr key={item.id} className="border border-black avoid-break">
                            <td className="p-2 border-r border-black font-mono text-center">{idx + 1}</td>
                            <td className="p-2 border-r border-black">{new Date(item.created_at).toLocaleDateString()}</td>
                            <td className="p-2 border-r border-black">
                                <span className="font-bold uppercase block">{item.category}</span>
                                <span className="italic text-gray-600">{item.note}</span>
                            </td>
                            <td className="p-2 border-r border-black text-right font-mono font-bold">${item.amount.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx global>{`@media print { @page { margin: 10mm; size: A4; } body { -webkit-print-color-adjust: exact; } tr { page-break-inside: avoid; } thead { display: table-header-group; } tfoot { display: table-footer-group; } }`}</style>
        </div>
    );
}