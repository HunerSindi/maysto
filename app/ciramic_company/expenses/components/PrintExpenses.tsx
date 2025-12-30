'use client';

import { Expense, ExpenseMeta } from '@/types/ciramic';
import { ciramicHeader } from '@/app/image/ciramic_header';
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function PrintExpenses({ data, meta }: { data: Expense[], meta: ExpenseMeta | null }) {
    const { t, language } = useLanguage();
    const isRtl = language === 'ar' || language === 'ku';

    return (
        <div className="hidden print:block fixed inset-0 bg-white z-[9999] p-8 overflow-visible" dir={isRtl ? 'rtl' : 'ltr'}>
            <table className="w-full border-collapse font-sans text-black table-fixed">
                <colgroup><col className="w-12" /><col className="w-32" /><col className="w-auto" /><col className="w-32" /></colgroup>
                <thead>
                    <tr>
                        <th colSpan={4} className="w-full pb-6">
                            <div className="flex justify-center w-full">
                                <img src={ciramicHeader} className="" alt="Header" />
                            </div>
                        </th>
                    </tr>
                    {/* <tr><th colSpan={4} className="text-center font-bold uppercase text-xl pb-6">{t.ceramic_expenses.title}</th></tr> */}
                    <tr className="bg-gray-100">
                        <th className="border border-black p-2 text-center text-xs font-bold">{t.ceramic_expenses.table.id}</th>
                        <th className={`border border-black p-2 text-xs font-bold ${isRtl ? 'text-right' : 'text-left'}`}>{t.ceramic_expenses.table.date}</th>
                        <th className={`border border-black p-2 text-xs font-bold ${isRtl ? 'text-right' : 'text-left'}`}>{t.ceramic_expenses.table.category} / {t.ceramic_expenses.table.note}</th>
                        <th className={`border border-black p-2 text-xs font-bold ${isRtl ? 'text-left' : 'text-right'}`}>{t.ceramic_expenses.table.amount}</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr className="bg-gray-50 font-bold">
                        <td colSpan={3} className={`border border-black p-2 text-xs uppercase ${isRtl ? 'text-left' : 'text-right'}`}>{t.ceramic_expenses.actions.total_expenses}:</td>
                        <td className={`border border-black p-2 text-xs font-mono ${isRtl ? 'text-left' : 'text-right'}`}>${meta?.total_expenses.toLocaleString()}</td>
                    </tr>
                </tfoot>
                <tbody className="text-xs">
                    {data.map((item, idx) => (
                        <tr key={item.id} className="avoid-break">
                            <td className="border border-black p-2 font-mono text-center">{idx + 1}</td>
                            <td className={`border border-black p-2 ${isRtl ? 'text-right' : 'text-left'}`}>{new Date(item.created_at).toLocaleDateString()}</td>
                            <td className={`border border-black p-2 ${isRtl ? 'text-right' : 'text-left'}`}><span className="font-bold uppercase block">{item.category}</span><span className="italic text-gray-600">{item.note}</span></td>
                            <td className={`border border-black p-2 font-mono font-bold ${isRtl ? 'text-left' : 'text-right'}`}>${item.amount.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx global>{`@media print { @page { margin: 10mm; size: A4; } body { -webkit-print-color-adjust: exact; } .print\\:block { position: fixed !important; inset: 0; width: 100%; height: 100%; } tr { page-break-inside: avoid; } thead { display: table-header-group; } tfoot { display: table-footer-group; } }`}</style>
        </div>
    );
}