'use client';

import { Customer, Transaction } from '@/types/personal';

interface PrintProps {
    customer: Customer;
    transactions: Transaction[];
}

export default function PrintCustomerStatement({ customer, transactions }: PrintProps) {

    // FIX: Ensure transactions is an array to prevent "Cannot read properties of null"
    const safeTransactions = transactions || [];

    return (
        <div className="hidden print:block absolute top-0 left-0 w-full bg-white z-[9999] p-0 m-0">
            <table className="w-full border-collapse font-sans text-black">

                {/* --- HEADER --- */}
                <thead>
                    {/* Customer Info Block */}
                    <tr>
                        <th colSpan={4} className="text-left pb-4">
                            <div className="border border-black p-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-sm font-bold uppercase">Customer Statement</h2>
                                        <p className="text-[10px] uppercase mt-1">Name: <span className="font-bold">{customer.name}</span></p>
                                        <p className="text-[10px] uppercase">Phone: {customer.phone}</p>
                                        <p className="text-[10px] uppercase">Location: {customer.location || '-'}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase">Print Date: {new Date().toLocaleDateString()}</p>
                                        <p className="text-[10px] uppercase">ID: #{customer.id}</p>
                                        <div className="mt-1 border border-black p-1 px-2 inline-block">
                                            <p className="text-[10px] font-bold uppercase">Current Balance</p>
                                            <p className={`text-sm font-mono font-bold ${customer.balance < 0 ? 'text-red-700' : 'text-black'}`}>
                                                ${customer.balance.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </th>
                    </tr>

                    {/* Column Headers */}
                    <tr className="border border-black bg-gray-100">
                        <th className="text-center text-[10px] uppercase p-2 border-r border-black w-12">#</th>
                        <th className="text-left text-[10px] uppercase p-2 border-r border-black w-32">Date</th>
                        <th className="text-left text-[10px] uppercase p-2 border-r border-black">Description</th>
                        <th className="text-right text-[10px] uppercase p-2 border-r border-black w-32">Amount</th>
                    </tr>
                </thead>

                {/* --- FOOTER --- */}
                <tfoot>
                    <tr className="border border-black font-bold bg-gray-50">
                        <td colSpan={3} className="text-right p-2 text-xs uppercase border-r border-black">
                            Closing Balance:
                        </td>
                        <td className="text-right p-2 text-xs font-mono">
                            {customer.balance.toLocaleString()}
                        </td>
                    </tr>
                </tfoot>

                {/* --- BODY --- */}
                <tbody className="text-[10px]">
                    {safeTransactions.length === 0 ? (
                        <tr className="border border-black">
                            <td colSpan={4} className="p-4 text-center italic">No transactions found.</td>
                        </tr>
                    ) : (
                        safeTransactions.map((tx, idx) => (
                            <tr key={tx.id} className="border border-black avoid-break">
                                <td className="p-2 border-r border-black font-mono text-center">{idx + 1}</td>
                                <td className="p-2 border-r border-black whitespace-nowrap">{new Date(tx.created_at).toLocaleDateString()}</td>
                                <td className="p-2 border-r border-black uppercase">{tx.note}</td>
                                <td className="p-2 border-r border-black text-right font-mono font-bold">
                                    {tx.amount.toLocaleString()}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Print CSS */}
            <style jsx global>{`
                @media print {
                    @page { margin: 10mm; size: A4; }
                    body { -webkit-print-color-adjust: exact; }
                    tr { page-break-inside: avoid; }
                    thead { display: table-header-group; } 
                    tfoot { display: table-footer-group; }
                }
            `}</style>
        </div>
    );
}