'use client';
import { WoodCustomer, WoodTransaction } from '@/types/wood';
import { systemHeader } from '@/app/image/header';
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PrintDetail({ customer, transactions }: { customer: WoodCustomer, transactions: WoodTransaction[] }) {
    const { t, language } = useLanguage();
    const isRtl = language === 'ar' || language === 'ku';

    return (
        <div
            className="hidden print:block fixed inset-0 bg-white z-[9999] p-8 overflow-visible"
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            <table className="w-full border-collapse font-sans text-black table-fixed">
                <colgroup>
                    <col className="w-12" />
                    <col className="w-32" />
                    <col className="w-auto" />
                    <col className="w-32" />
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan={4} className=" pb-6">
                            <div className="flex justify-center ">
                                <img src={systemHeader} className="" alt="Header" />
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th colSpan={4} className="pb-4">
                            <div className="border border-black p-3 bg-gray-50">
                                <h2 className="text-sm font-bold uppercase">
                                    {t.wood_customer_detail.print.statement} {customer.name}
                                </h2>
                            </div>
                        </th>
                    </tr>
                    <tr className="bg-gray-100">
                        <th className="border border-black p-2 text-center text-[10px] uppercase w-12">{t.wood_customer_detail.transactions.table.id}</th>
                        <th className={`border border-black p-2 text-[10px] uppercase w-32 ${isRtl ? 'text-right' : 'text-left'}`}>{t.wood_customer_detail.transactions.table.date}</th>
                        <th className={`border border-black p-2 text-[10px] uppercase ${isRtl ? 'text-right' : 'text-left'}`}>{t.wood_customer_detail.transactions.table.note}</th>
                        <th className={`border border-black p-2 text-[10px] uppercase w-32 ${isRtl ? 'text-left' : 'text-right'}`}>{t.wood_customer_detail.transactions.table.amount}</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr className="bg-gray-50 font-bold">
                        <td colSpan={3} className={`border border-black p-2 text-xs uppercase ${isRtl ? 'text-left' : 'text-right'}`}>{t.wood_customer_detail.print.balance}</td>
                        <td className={`border border-black p-2 text-xs font-mono ${isRtl ? 'text-left' : 'text-right'}`}>{customer.balance.toLocaleString()}</td>
                    </tr>
                </tfoot>
                <tbody className="text-[10px]">
                    {transactions.map((tx, idx) => (
                        <tr key={tx.id} className="avoid-break">
                            <td className="border border-black p-2 font-mono text-center">{idx + 1}</td>
                            <td className={`border border-black p-2 ${isRtl ? 'text-right' : 'text-left'}`}>{new Date(tx.created_at).toLocaleDateString()}</td>
                            <td className={`border border-black p-2 ${isRtl ? 'text-right' : 'text-left'}`}>{tx.note}</td>
                            <td className={`border border-black p-2 font-mono font-bold ${isRtl ? 'text-left' : 'text-right'}`}>{tx.amount.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <style jsx global>{`
                @media print { 
                    @page { margin: 10mm; size: A4; } 
                    body { -webkit-print-color-adjust: exact; } 
                    
                    .print\\:block { 
                        position: fixed !important;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                    }
                    
                    tr { page-break-inside: avoid; } 
                    thead { display: table-header-group; } 
                    tfoot { display: table-footer-group; } 
                }
            `}</style>
        </div>
    );
}