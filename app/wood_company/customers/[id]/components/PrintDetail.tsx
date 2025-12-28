'use client';
import { WoodCustomer, WoodTransaction } from '@/types/wood';

export default function PrintDetail({ customer, transactions }: { customer: WoodCustomer, transactions: WoodTransaction[] }) {
    return (
        <div className="hidden print:block absolute top-0 left-0 w-full bg-white z-[9999] p-0 m-0">
            <table className="w-full border-collapse font-sans text-black">
                <thead>
                    <tr><th colSpan={4} className="w-full pb-4"><img src="/print/header.png" className="w-full h-auto max-h-[150px]" /></th></tr>
                    <tr><th colSpan={4} className="text-left pb-4"><div className="border border-black p-2"><h2 className="text-sm font-bold uppercase">Customer Statement: {customer.name}</h2></div></th></tr>
                    <tr className="border border-black bg-gray-100"><th className="text-center text-[10px] uppercase p-2 border-r border-black w-12">#</th><th className="text-left text-[10px] uppercase p-2 border-r border-black w-32">Date</th><th className="text-left text-[10px] uppercase p-2 border-r border-black">Note</th><th className="text-right text-[10px] uppercase p-2 w-32">Amount</th></tr>
                </thead>
                <tfoot>
                    <tr className="border border-black font-bold bg-gray-50"><td colSpan={3} className="text-right p-2 text-xs uppercase border-r border-black">Balance:</td><td className="text-right p-2 text-xs font-mono">{customer.balance.toLocaleString()}</td></tr>
                </tfoot>
                <tbody className="text-[10px]">
                    {transactions.map((tx, idx) => (
                        <tr key={tx.id} className="border border-black avoid-break">
                            <td className="p-2 border-r border-black font-mono text-center">{idx + 1}</td>
                            <td className="p-2 border-r border-black">{new Date(tx.created_at).toLocaleDateString()}</td>
                            <td className="p-2 border-r border-black">{tx.note}</td>
                            <td className="p-2 border-r border-black text-right font-mono font-bold">{tx.amount.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx global>{`@media print { @page { margin: 10mm; size: A4; } body { -webkit-print-color-adjust: exact; } tr { page-break-inside: avoid; } thead { display: table-header-group; } tfoot { display: table-footer-group; } }`}</style>
        </div>
    );
}